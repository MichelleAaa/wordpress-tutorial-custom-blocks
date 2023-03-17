import { registerBlockType } from '@wordpress/blocks';
import './team-member'; // this is the nested, inner block for the team-member component.
import './style.scss';
import Edit from './edit';
import save from './save';

registerBlockType( 'blocks-course/team-members', {
	edit: Edit,
	save,
} );