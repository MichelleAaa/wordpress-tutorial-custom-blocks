import { registerPlugin } from '@wordpress/plugins';
import {
	PluginSidebar,
	PluginDocumentSettingPanel,
	PluginPostStatusInfo,
	PluginPrePublishPanel,
	PluginPostPublishPanel,
	PluginMoreMenuItem,
	PluginBlockSettingsMenuItem,
} from '@wordpress/edit-post';
import { __ } from '@wordpress/i18n';

//blocks-course-plugin is just a name we make up for it.
registerPlugin('blocks-course-plugin', {
	render: () => {
		return (
    <>
    {/* NOTE: These didn't work for me:
        <PluginDocumentSettingPanel
            title="My Panel"
            icon="admin-collapse"
        >
            {/* This adds My Panel to the normal WP right sidebar. */}
            <p>Document Setting Panel</p>
        </PluginDocumentSettingPanel>
        {/* This will add content to the Status & Visibility section of the WP right sidebar */}
        <PluginPostStatusInfo>
            <p>Status info content</p>
        </PluginPostStatusInfo>
        {/* This should add something to the panel that shows up when you click publish, and it asks you if you are sure: */}
        <PluginPrePublishPanel title="Pre publish title">
            Pre publish content
        </PluginPrePublishPanel>
        {/* This adds something to the right sidebar panel after you have confirmed that you want to publish a post. */}
        <PluginPostPublishPanel title="Post publish title">
            Post publish content
        </PluginPostPublishPanel>
        {/* on the very top right there's a three dot icon. This option should allow you to add items to that section: */}
        <PluginMoreMenuItem
            icon="admin-customizer"
            onClick={() => alert(true)}
        >
            Plugin Item
        </PluginMoreMenuItem>
        {/* This will only show up in core/paragraph block as that's what's been set up in allowedBlocks. When you create a new paragraph, in the hover toolbar, when you click the three dots you should see "New Item" listed. */}
        <PluginBlockSettingsMenuItem
            allowedBlocks={['core/paragraph']}
            icon="admin-home"
            label="New Item"
            onClick={() => alert(true)}
        />
         */}
    {/* //This creates an icon next to our settings icon in the editor, in the top right of the screen. If you click on it, a different sidebar will open on the right side of the screen. */}
			<PluginSidebar
				name="meta-fields-sidebar" 
// the name can be used when you want to target this sidebar. For instance, wp.data.dispatch('core/edit-post').openGeneralSidebar('blocks-course-plugin/meta-fields-sidebar') -- this would open the sidebar if you used it in the console in the edit post page.
				icon="admin-settings"
				title={__('Post Options', 'blocks-course')}
			>
				hbiuhiihou
			</PluginSidebar>
    </>
		);
	},
});