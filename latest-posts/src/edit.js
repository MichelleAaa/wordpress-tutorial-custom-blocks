import { __ } from '@wordpress/i18n';
import { RawHTML } from '@wordpress/element'; 
// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
import { format, dateI18n, __experimentalGetSettings } from '@wordpress/date';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl, QueryControls } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import './editor.scss';


export default function Edit({ attributes, setAttributes }) {
	const { numberOfPosts, displayFeaturedImage, order, orderBy, categories  } = attributes;

	//We have to supply the query with an array of the id's, so we are looping through the categories array of objects to pull out only the ids. 
	const catIDs =
		categories && categories.length > 0
			? categories.map((cat) => cat.id)
			: [];

// In the console, with the editor open - wp.data.select('core') -- you can see all the functions avaialble.
// One of the functions is select('core').getEntityRecords, which we use below. It will get multiple posts or post types. You pass it the type of the post type, taxonomy, etc.
// The below is similar to entering wp.data.select('core').getEntityRecords('postType', 'post'...) in the console.
	const posts = useSelect(
		(select) => {
			return select('core').getEntityRecords('postType', 'post', {
				per_page: numberOfPosts,
				_embed: true,
				// _embed is required for the _embedded key:value to show up. That's where we get our media details. (URL's for the featured image of different sizes.)
				order,
				orderby: orderBy,
				categories: catIDs,
			});
		},
		[numberOfPosts, order, orderBy, categories] //whenever the numberOfPosts changes, it will re-fetch.
	);
	// console.log(posts);

	// To get the category, in the console that would be wp.data.select('core').getEntityRecords('taxonomy', 'category'...)
	const allCats = useSelect((select) => {
		return select('core').getEntityRecords('taxonomy', 'category', {
			per_page: -1, //-1 means will pull all
		});
	}, []); // The categories will not change, so we don't need this to update again -- so the [] is empty.

	const catSuggestions = {};
	if (allCats) {
		for (let i = 0; i < allCats.length; i++) {
			const cat = allCats[i];
			catSuggestions[cat.name] = cat;
		}
	}
	// console.log(catSuggestions);

	const onDisplayFeaturedImageChange = (value) => {
		setAttributes({ displayFeaturedImage: value });
	};
	const onNumberOfItemsChange = (value) => {
		setAttributes({ numberOfPosts: value });
	};

	// values will be an array of objects (for pre-existing items), plus the new category being added, which will be a string. So we have to filter through to process the new string values.
	const onCategoryChange = (values) => {
		const hasNoSuggestions = values.some(
			(value) => typeof value === 'string' && !catSuggestions[value]
		); //if there's any string values, we have to check if they don't already exist in our categorySuggestions object.
		if (hasNoSuggestions) return;

		// Each item is either an object or a string. If it's a string, we turn it into an object. If it's an object, we just return it as it is.
		const updatedCats = values.map((token) => {
			return typeof token === 'string' ? catSuggestions[token] : token;
		});

		setAttributes({ categories: updatedCats });
	};

	return (
	<>
		<InspectorControls>
			<PanelBody>
				{/* If the displayFeaturedImage value is true, then this will be checked */}
				<ToggleControl
					label={__('Display Featured Image', 'latest-posts')}
					checked={displayFeaturedImage}
					onChange={onDisplayFeaturedImageChange}
				/>
				{/* QueryControls is used to control a WP query. In the wp-admin panel there will be a panel in the right sidebar where you can change some of the options for the query, such as order.  */}
				<QueryControls
					numberOfItems={numberOfPosts}
					onNumberOfItemsChange={onNumberOfItemsChange}
					maxItems={10}
					minItems={1}
					orderBy={orderBy}
					// You could order by "date".
					onOrderByChange={(value) =>
						setAttributes({ orderBy: value })
					}
					order={order}
					// Order could be "asc"
					onOrderChange={(value) =>
						setAttributes({ order: value })
					}
				// ONE METHOD: With the categoriesList method (and the two other options below) you can only filter by one category at a time, instead of multiple. So we won't use this method, and will instead use the categorySuggestions method. 
					// categoriesList={[allCats]}
					// selectedCategoryId={1}
					// onCategoryChange={(value) => console.log(value)}

				// categorySuggestions requires an object where the keys are category names and the values are the category objects. (The category object includes things like it's id, link, slug, etc.)
					categorySuggestions={catSuggestions}
					// now we can select multiple categories with selectedCategories. It requires an array which will contain objects of the selected category. example: [{id: 1, name: 'cat 1'}, {id: 2, name: 'cat 2'},]
					selectedCategories={categories}
					onCategoryChange={onCategoryChange}
				/>
			</PanelBody>
		</InspectorControls>
		<ul {...useBlockProps()}>
	{/* At first, posts will be null since it has to fetch the data, so we have to wait for it to finish before this runs: */}
			{posts &&
				posts.map((post) => {
					// If we look in the console of the post this is the route to the featured image.
					const featuredImage =
						post._embedded &&
						post._embedded['wp:featuredmedia'] &&
						post._embedded['wp:featuredmedia'].length > 0 &&
						post._embedded['wp:featuredmedia'][0];
					return (
						<li key={post.id}>
							{displayFeaturedImage && featuredImage && (
								<img
									src={
										featuredImage.media_details.sizes.large
											.source_url
									}
									alt={featuredImage.alt_text}
								/>
							)}
							<h5>
			{/* RawHTML will render our data as an HTML element instead of as a string. */}
								<a href={post.link}>
									{post.title.rendered ? (
										<RawHTML>{post.title.rendered}</RawHTML>
									) : (
										__('(No title)', 'latest-posts')
									)}
								</a>
							</h5>
							{post.date_gmt && (
								// Note that dateTime is in camelCase when used in the .js file, instead of lowercase, as in the plugin.php file:
								<time dateTime={format('c', post.date_gmt)}>
									{dateI18n(
										__experimentalGetSettings().formats
											.date,
										post.date_gmt
									)}
									{/* wp-admin - settings - General - you can check the Date Format.  */}
								</time>
							)}
							{post.excerpt.rendered && (
								<RawHTML>{post.excerpt.rendered}</RawHTML>
							)}
						</li>
					);
				})}
		</ul>
	</>
	);
}