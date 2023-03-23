/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/filters/index.js":
/*!******************************!*\
  !*** ./src/filters/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/hooks */ "@wordpress/hooks");
/* harmony import */ var _wordpress_hooks__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/dom-ready */ "@wordpress/dom-ready");
/* harmony import */ var _wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5__);







//This file was imported into src/index.js

//In the PHP filters, we can only access the items in block.json. In the JS one though, we can also access things in the index.js file's registerBlockType function. (including the edit and save functions.)

const changeParagraphIcon = (settings, name) => {
  if (name === 'core/paragraph') {
    return {
      ...settings,
      icon: 'twitter'
    };
    //The icon is from block.json (it's the icon that shows up in the editor blocks search panel.)
  }

  return settings;
};

//To call the filter:
//The second argument is the namespace/ a name you make up. 
//The third is your function.
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('blocks.registerBlockType', 'block-course/change-paragraph-icon', changeParagraphIcon);

//This receives the edit component that already exists, BlockEdit. -- It modifies the edit component of all blocks.
const modifyEdit = BlockEdit => {
  return props => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(BlockEdit, props), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, null, "Custom Panel")));
  };
};
(0,_wordpress_hooks__WEBPACK_IMPORTED_MODULE_1__.addFilter)('editor.BlockEdit', 'block-course/change-edit', modifyEdit);

//This unregisters a block. You need to make sure the dom is already ready before running it.
_wordpress_dom_ready__WEBPACK_IMPORTED_MODULE_5___default()(() => {
  (0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_4__.unregisterBlockType)('core/paragraph');
});

/***/ }),

/***/ "./src/format-types/highlight.js":
/*!***************************************!*\
  !*** ./src/format-types/highlight.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/rich-text */ "@wordpress/rich-text");
/* harmony import */ var _wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);





// Imported this file into index.js.

// When we type in text in a paragraph element or something, this file is going to allow us to highlight a portion of that text, and then have a menu of new options for styling that text. In this case, we only added a second Highlight option which only adds the yellow background color (note that you have to click the down arrow < angular bracket to see the option we added.)

const HighlightFormatButton = _ref => {
  let {
    isActive,
    value,
    onChange
  } = _ref;
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.RichTextToolbarButton, {
    icon: "edit",
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Highlight', 'blocks-course'),
    onClick: () => {
      onChange((0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.toggleFormat)(value, {
        type: 'block-course/highlight',
        attributes: {
          style: 'background-color: #f0ff00'
        }
      }));
    },
    isActive: isActive
  });
};
(0,_wordpress_rich_text__WEBPACK_IMPORTED_MODULE_1__.registerFormatType)('block-course/highlight', {
  title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Highlight', 'blocks-course'),
  tagName: 'span',
  // the tagname is what wraps the text that we selected (that we highlighted and are going to style differently from the rest of the text, such as in something like a paragraph element):
  className: null,
  //we are going to use inline styling above to style the span instead of adding a classname, but that's also an option.
  edit: HighlightFormatButton //edit is the component that is going to appear near the hover toolbar when you are in a paragraph or some text element and are selecting a portion of the text.
});

//After selecting some text, click the down arrow in the hover toolbar, and selecting the highlight function, the HTMl looks like so:
//<p>testing this <span style="background-color: #f0ff00">out</span></p>

/***/ }),

/***/ "./src/plugins/sidebar.js":
/*!********************************!*\
  !*** ./src/plugins/sidebar.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/plugins */ "@wordpress/plugins");
/* harmony import */ var _wordpress_plugins__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/edit-post */ "@wordpress/edit-post");
/* harmony import */ var _wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__);






const MetaFieldsInputs = () => {
  // This pulls in the metabox field data that we added in metabox.php:
  const subtitleValue = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useSelect)(select => {
    return select('core/editor').getEditedPostAttribute('meta')._blocks_course_post_subtitle;
  });
  const {
    editPost
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_4__.useDispatch)('core/editor'); // pulls out the editPost method from the core/editor store.
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.PanelBody, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Subtitle Options', 'blocks-course')
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_3__.TextControl, {
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Subtitle', 'blocks-course'),
    value: subtitleValue,
    onChange: value => {
      editPost({
        meta: {
          _blocks_course_post_subtitle: value
        }
      });
    }
  }));
};
(0,_wordpress_plugins__WEBPACK_IMPORTED_MODULE_1__.registerPlugin)('blocks-course-plugin', {
  render: () => {
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_edit_post__WEBPACK_IMPORTED_MODULE_2__.PluginSidebar, {
      name: "meta-fields-sidebar",
      icon: "admin-settings",
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_5__.__)('Post Options', 'blocks-course')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(MetaFieldsInputs, null));
  }
});

/***/ }),

/***/ "./src/todos-store/actions.js":
/*!************************************!*\
  !*** ./src/todos-store/actions.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addTodo": () => (/* binding */ addTodo),
/* harmony export */   "populateTodos": () => (/* binding */ populateTodos),
/* harmony export */   "toggleTodo": () => (/* binding */ toggleTodo),
/* harmony export */   "updateTodo": () => (/* binding */ updateTodo)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./types */ "./src/todos-store/types.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./controls */ "./src/todos-store/controls.js");


 //we re-name the function becuase we already have one with the same name in the file.

// The action is an object which has a type and any other arguments you need. So here, we need to pass in the todo parameter.
// Note that arrow functions can't be generator functions, which is why this was converted back to a normal function:
function* addTodo(title) {
  try {
    const todo = yield (0,_controls__WEBPACK_IMPORTED_MODULE_2__.createTodo)(title);
    return {
      type: _types__WEBPACK_IMPORTED_MODULE_1__.ADD_TODO,
      todo
    };
  } catch (error) {
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/notices').createErrorNotice(error.message || 'Could not create todo.');
  }
}
function* toggleTodo(todo, index) {
  try {
    // Loading is so we can disable the checkbox while we are waiting for the update:
    yield updateTodo({
      ...todo,
      loading: true
    }, index);
    const updatedTodo = yield (0,_controls__WEBPACK_IMPORTED_MODULE_2__.toggleTodo)(todo);
    return updateTodo(updatedTodo, index);
  } catch (error) {
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/notices').createErrorNotice(error.message || 'Could not update todo.');
  }
}
const updateTodo = (todo, index) => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__.UPDATE_TODO,
    index,
    todo
  };
};
const populateTodos = todos => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_1__.POPULATE_TODOS,
    todos
  };
};

/***/ }),

/***/ "./src/todos-store/controls.js":
/*!*************************************!*\
  !*** ./src/todos-store/controls.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createTodo": () => (/* binding */ createTodo),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "fetchTodos": () => (/* binding */ fetchTodos),
/* harmony export */   "toggleTodo": () => (/* binding */ toggleTodo)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/todos-store/types.js");


//Controls are another type of action. Instead of updating the state directly, they can dispatch API requests.

// This is a control action creator. (Which returns an object that at minimum returns the type.):
const fetchTodos = () => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__.FETCH_TODOS
  };
};
const createTodo = title => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__.CREATE_TODO,
    title
  };
};
const toggleTodo = todo => {
  return {
    type: _types__WEBPACK_IMPORTED_MODULE_0__.TOGGLE_TODO,
    todo
  };
};

// Control functions are run whenever we dispatch the control action. Each key should correspond to the action type.
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  FETCH_TODOS() {
    return window.fetch('https://jsonplaceholder.typicode.com/todos?_limit=10').then(response => {
      if (response.ok) {
        return response.json();
      }
      // The default behavior of fetch would return the error in the try block (of our function in resolvers.js) instead of the catch block... so we have to manually set it up to throw an Error.
      throw new Error('Could not fetch todos');
    });
  },
  // Most of this code comes from the Creating a Resource section of the API we are using -- we get the object parameter from the action creator:
  CREATE_TODO(_ref) {
    let {
      title
    } = _ref;
    return window.fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      body: JSON.stringify({
        title,
        completed: false,
        userId: 1
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Could not create todo.');
    });
  },
  // This is a patch request, mostly copied from the API docs. It will modify the completed option. (Which controls whether the checkbox is selected or not.)
  TOGGLE_TODO(_ref2) {
    let {
      todo
    } = _ref2;
    return window.fetch(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        // We set it to the opposite of what it currently is:
        completed: !todo.completed
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    }).then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Could not update todo.');
    });
  }
});

/***/ }),

/***/ "./src/todos-store/index.js":
/*!**********************************!*\
  !*** ./src/todos-store/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./reducer */ "./src/todos-store/reducer.js");
/* harmony import */ var _selectors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectors */ "./src/todos-store/selectors.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./actions */ "./src/todos-store/actions.js");
/* harmony import */ var _resolvers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./resolvers */ "./src/todos-store/resolvers.js");
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./controls */ "./src/todos-store/controls.js");
 // To register a new store, you have to install the @wordpress/data package.





const store = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.createReduxStore)('blocks-course/todos', {
  reducer: _reducer__WEBPACK_IMPORTED_MODULE_1__["default"],
  // this is technically reducer: reducer - reducers are used to change the state of something in our store. It receives the old state and an action, and then returns the new state.
  selectors: _selectors__WEBPACK_IMPORTED_MODULE_2__,
  // the selector is used to pull data from the store.
  actions: _actions__WEBPACK_IMPORTED_MODULE_3__,
  // the action is used to generate an action object, which is passed to the reducer, to perform a function.
  resolvers: _resolvers__WEBPACK_IMPORTED_MODULE_4__,
  //Selectors shouldn't call an API or have any side effects. So we are going to use resolvers in addition to the selector function.
  controls: _controls__WEBPACK_IMPORTED_MODULE_5__["default"] //To send an API request in a resolver, we need to create controls.
});

(0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.register)(store);

/***/ }),

/***/ "./src/todos-store/reducer.js":
/*!************************************!*\
  !*** ./src/todos-store/reducer.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./types */ "./src/todos-store/types.js");


// It's best to start as an object in case you have to add additional items to the store later (as in that case, you can just add a new key/value pair.)
const DEFAULT_STATE = {
  items: []
};

// The reducer function receives the action object from actions.js and then checks the type. Based on the type, it performs the action to return a new state.
const reducer = function () {
  let state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : DEFAULT_STATE;
  let action = arguments.length > 1 ? arguments[1] : undefined;
  switch (action.type) {
    case _types__WEBPACK_IMPORTED_MODULE_0__.ADD_TODO:
      // In redux we always return a new object, which is why we are copying the state in with ...state
      return {
        ...state,
        items: [...state.items, action.todo]
      };
    case _types__WEBPACK_IMPORTED_MODULE_0__.POPULATE_TODOS:
      return {
        ...state,
        items: action.todos
      };
    case _types__WEBPACK_IMPORTED_MODULE_0__.UPDATE_TODO:
      {
        const itemsCopy = [...state.items];
        itemsCopy[action.index] = action.todo;
        return {
          ...state,
          items: itemsCopy
        };
      }
    default:
      return state;
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (reducer);

/***/ }),

/***/ "./src/todos-store/resolvers.js":
/*!**************************************!*\
  !*** ./src/todos-store/resolvers.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getTodos": () => (/* binding */ getTodos)
/* harmony export */ });
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _controls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./controls */ "./src/todos-store/controls.js");
/* harmony import */ var _actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./actions */ "./src/todos-store/actions.js");



function* getTodos() {
  try {
    const todos = yield (0,_controls__WEBPACK_IMPORTED_MODULE_1__.fetchTodos)();
    // the code will stop after the execution of the fetchTodos() due to the yield statement, waiting for it to finish, before moving onto the return line:

    // After the fetch is completed, we have the todos. We then have to call populateTodos to call another action creator object to be created, and pass in the todos data, so the state can be updated by the reducer.
    return (0,_actions__WEBPACK_IMPORTED_MODULE_2__.populateTodos)(todos);
  } catch (error) {
    // wp.data.dispatch('core/notices').createErrorNotice('error message here') -- this is how you could access the same function from the console in the editor screen. It will create an error notice at the top of the panel with your text. 
    return (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_0__.dispatch)('core/notices').createErrorNotice(error.message || 'Could not fetch todos.');
  }
}

//The function in resolvers has to have the same name as the one in selectors.js, as it's going to handle the side-effects/API calls that the function in selectors isn't allowed to do.
//with function* getTodos() - the resolver function will run whenever the selector function getTodos() runs. -- function* is a generator function. It's a function that can stop its execution at a certain point, and then can continue again later. It's useful when working with API's. 

//To send an API request in a resolver, we need to create controls.

//The data that comes back from the API request, and is now in our custom store, can be accessed in the editor screen console with:
//wp.data.select('blocks-course/todos').getTodos()

/***/ }),

/***/ "./src/todos-store/selectors.js":
/*!**************************************!*\
  !*** ./src/todos-store/selectors.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDoneTodos": () => (/* binding */ getDoneTodos),
/* harmony export */   "getTodos": () => (/* binding */ getTodos),
/* harmony export */   "getTodosNumber": () => (/* binding */ getTodosNumber),
/* harmony export */   "getUnDoneTodos": () => (/* binding */ getUnDoneTodos)
/* harmony export */ });
const getTodos = state => {
  return state.items;
};

// note that if you go into the console in the editor (with this plugin already activated) - wp.data.select('blocks-course/todos') -- now you can see the getTodos method is available.

// These were added for the to-dos-list plugin: (Most of the rest of the code for this plugin was created to back up the to-dos block plugin.)
const getTodosNumber = state => {
  return state.items.length;
};
const getDoneTodos = state => {
  return state.items.filter(todo => todo.completed).length;
};
// In the console in the editor these could be accessed like: wp.data.select('blocks-course/todos').getDoneTodosNumber() - it will output the number of todos that are checked.

const getUnDoneTodos = state => {
  return state.items.filter(todo => !todo.completed).length;
};

/***/ }),

/***/ "./src/todos-store/types.js":
/*!**********************************!*\
  !*** ./src/todos-store/types.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ADD_TODO": () => (/* binding */ ADD_TODO),
/* harmony export */   "CREATE_TODO": () => (/* binding */ CREATE_TODO),
/* harmony export */   "FETCH_TODOS": () => (/* binding */ FETCH_TODOS),
/* harmony export */   "POPULATE_TODOS": () => (/* binding */ POPULATE_TODOS),
/* harmony export */   "TOGGLE_TODO": () => (/* binding */ TOGGLE_TODO),
/* harmony export */   "UPDATE_TODO": () => (/* binding */ UPDATE_TODO)
/* harmony export */ });
const ADD_TODO = 'ADD_TODO';
const FETCH_TODOS = 'FETCH_TODOS';
const POPULATE_TODOS = 'POPULATE_TODOS';
const CREATE_TODO = 'CREATE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const UPDATE_TODO = 'UPDATE_TODO';

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/dom-ready":
/*!**********************************!*\
  !*** external ["wp","domReady"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["domReady"];

/***/ }),

/***/ "@wordpress/edit-post":
/*!**********************************!*\
  !*** external ["wp","editPost"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["editPost"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/hooks":
/*!*******************************!*\
  !*** external ["wp","hooks"] ***!
  \*******************************/
/***/ ((module) => {

module.exports = window["wp"]["hooks"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "@wordpress/plugins":
/*!*********************************!*\
  !*** external ["wp","plugins"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["plugins"];

/***/ }),

/***/ "@wordpress/rich-text":
/*!**********************************!*\
  !*** external ["wp","richText"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["richText"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _todos_store__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todos-store */ "./src/todos-store/index.js");
/* harmony import */ var _plugins_sidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugins/sidebar */ "./src/plugins/sidebar.js");
/* harmony import */ var _format_types_highlight__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./format-types/highlight */ "./src/format-types/highlight.js");
/* harmony import */ var _filters__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filters */ "./src/filters/index.js");




})();

/******/ })()
;
//# sourceMappingURL=index.js.map