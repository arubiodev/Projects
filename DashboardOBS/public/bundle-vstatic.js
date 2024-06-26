
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
	'use strict';

	/** @returns {void} */
	function noop$1() {}

	/** @returns {void} */
	function add_location(element, file, line, column, char) {
		element.__svelte_meta = {
			loc: { file, line, column, char }
		};
	}

	function run(fn) {
		return fn();
	}

	function blank_object() {
		return Object.create(null);
	}

	/**
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function run_all(fns) {
		fns.forEach(run);
	}

	/**
	 * @param {any} thing
	 * @returns {thing is Function}
	 */
	function is_function(thing) {
		return typeof thing === 'function';
	}

	/** @returns {boolean} */
	function safe_not_equal(a, b) {
		return a != a ? b == b : a !== b || (a && typeof a === 'object') || typeof a === 'function';
	}

	let src_url_equal_anchor;

	/**
	 * @param {string} element_src
	 * @param {string} url
	 * @returns {boolean}
	 */
	function src_url_equal(element_src, url) {
		if (element_src === url) return true;
		if (!src_url_equal_anchor) {
			src_url_equal_anchor = document.createElement('a');
		}
		// This is actually faster than doing URL(..).href
		src_url_equal_anchor.href = url;
		return element_src === src_url_equal_anchor.href;
	}

	/** @returns {boolean} */
	function is_empty(obj) {
		return Object.keys(obj).length === 0;
	}

	var global$1 = (typeof global !== "undefined" ? global :
	  typeof self !== "undefined" ? self :
	  typeof window !== "undefined" ? window : {});

	/** @type {typeof globalThis} */
	const globals =
		typeof window !== 'undefined'
			? window
			: typeof globalThis !== 'undefined'
			? globalThis
			: // @ts-ignore Node typings have this
			  global$1;

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append(target, node) {
		target.appendChild(node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert(target, node, anchor) {
		target.insertBefore(node, anchor || null);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach(node) {
		if (node.parentNode) {
			node.parentNode.removeChild(node);
		}
	}

	/**
	 * @returns {void} */
	function destroy_each(iterations, detaching) {
		for (let i = 0; i < iterations.length; i += 1) {
			if (iterations[i]) iterations[i].d(detaching);
		}
	}

	/**
	 * @template {keyof HTMLElementTagNameMap} K
	 * @param {K} name
	 * @returns {HTMLElementTagNameMap[K]}
	 */
	function element(name) {
		return document.createElement(name);
	}

	/**
	 * @template {keyof SVGElementTagNameMap} K
	 * @param {K} name
	 * @returns {SVGElement}
	 */
	function svg_element(name) {
		return document.createElementNS('http://www.w3.org/2000/svg', name);
	}

	/**
	 * @param {string} data
	 * @returns {Text}
	 */
	function text(data) {
		return document.createTextNode(data);
	}

	/**
	 * @returns {Text} */
	function space() {
		return text(' ');
	}

	/**
	 * @returns {Text} */
	function empty() {
		return text('');
	}

	/**
	 * @param {EventTarget} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @returns {() => void}
	 */
	function listen(node, event, handler, options) {
		node.addEventListener(event, handler, options);
		return () => node.removeEventListener(event, handler, options);
	}

	/**
	 * @returns {(event: any) => any} */
	function prevent_default(fn) {
		return function (event) {
			event.preventDefault();
			// @ts-ignore
			return fn.call(this, event);
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr(node, attribute, value) {
		if (value == null) node.removeAttribute(attribute);
		else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
	}

	/**
	 * @param {Element} element
	 * @returns {ChildNode[]}
	 */
	function children(element) {
		return Array.from(element.childNodes);
	}

	/**
	 * @returns {void} */
	function set_input_value(input, value) {
		input.value = value == null ? '' : value;
	}

	/**
	 * @returns {void} */
	function set_style(node, key, value, important) {
		if (value == null) {
			node.style.removeProperty(key);
		} else {
			node.style.setProperty(key, value, '');
		}
	}

	/**
	 * @returns {void} */
	function select_option(select, value, mounting) {
		for (let i = 0; i < select.options.length; i += 1) {
			const option = select.options[i];
			if (option.__value === value) {
				option.selected = true;
				return;
			}
		}
		if (!mounting || value !== undefined) {
			select.selectedIndex = -1; // no option should be selected
		}
	}

	function select_value(select) {
		const selected_option = select.querySelector(':checked');
		return selected_option && selected_option.__value;
	}

	/**
	 * @returns {void} */
	function toggle_class(element, name, toggle) {
		// The `!!` is required because an `undefined` flag means flipping the current state.
		element.classList.toggle(name, !!toggle);
	}

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @param {{ bubbles?: boolean, cancelable?: boolean }} [options]
	 * @returns {CustomEvent<T>}
	 */
	function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
		return new CustomEvent(type, { detail, bubbles, cancelable });
	}

	/**
	 * @typedef {Node & {
	 * 	claim_order?: number;
	 * 	hydrate_init?: true;
	 * 	actual_end_child?: NodeEx;
	 * 	childNodes: NodeListOf<NodeEx>;
	 * }} NodeEx
	 */

	/** @typedef {ChildNode & NodeEx} ChildNodeEx */

	/** @typedef {NodeEx & { claim_order: number }} NodeEx2 */

	/**
	 * @typedef {ChildNodeEx[] & {
	 * 	claim_info?: {
	 * 		last_index: number;
	 * 		total_claimed: number;
	 * 	};
	 * }} ChildNodeArray
	 */

	let current_component;

	/** @returns {void} */
	function set_current_component(component) {
		current_component = component;
	}

	function get_current_component() {
		if (!current_component) throw new Error('Function called outside component initialization');
		return current_component;
	}

	/**
	 * The `onMount` function schedules a callback to run as soon as the component has been mounted to the DOM.
	 * It must be called during the component's initialisation (but doesn't need to live *inside* the component;
	 * it can be called from an external module).
	 *
	 * If a function is returned _synchronously_ from `onMount`, it will be called when the component is unmounted.
	 *
	 * `onMount` does not run inside a [server-side component](https://svelte.dev/docs#run-time-server-side-component-api).
	 *
	 * https://svelte.dev/docs/svelte#onmount
	 * @template T
	 * @param {() => import('./private.js').NotFunction<T> | Promise<import('./private.js').NotFunction<T>> | (() => any)} fn
	 * @returns {void}
	 */
	function onMount(fn) {
		get_current_component().$$.on_mount.push(fn);
	}

	/**
	 * Schedules a callback to run immediately before the component is unmounted.
	 *
	 * Out of `onMount`, `beforeUpdate`, `afterUpdate` and `onDestroy`, this is the
	 * only one that runs inside a server-side component.
	 *
	 * https://svelte.dev/docs/svelte#ondestroy
	 * @param {() => any} fn
	 * @returns {void}
	 */
	function onDestroy(fn) {
		get_current_component().$$.on_destroy.push(fn);
	}

	/**
	 * Creates an event dispatcher that can be used to dispatch [component events](https://svelte.dev/docs#template-syntax-component-directives-on-eventname).
	 * Event dispatchers are functions that can take two arguments: `name` and `detail`.
	 *
	 * Component events created with `createEventDispatcher` create a
	 * [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent).
	 * These events do not [bubble](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events#Event_bubbling_and_capture).
	 * The `detail` argument corresponds to the [CustomEvent.detail](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/detail)
	 * property and can contain any type of data.
	 *
	 * The event dispatcher can be typed to narrow the allowed event names and the type of the `detail` argument:
	 * ```ts
	 * const dispatch = createEventDispatcher<{
	 *  loaded: never; // does not take a detail argument
	 *  change: string; // takes a detail argument of type string, which is required
	 *  optional: number | null; // takes an optional detail argument of type number
	 * }>();
	 * ```
	 *
	 * https://svelte.dev/docs/svelte#createeventdispatcher
	 * @template {Record<string, any>} [EventMap=any]
	 * @returns {import('./public.js').EventDispatcher<EventMap>}
	 */
	function createEventDispatcher() {
		const component = get_current_component();
		return (type, detail, { cancelable = false } = {}) => {
			const callbacks = component.$$.callbacks[type];
			if (callbacks) {
				// TODO are there situations where events could be dispatched
				// in a server (non-DOM) environment?
				const event = custom_event(/** @type {string} */ (type), detail, { cancelable });
				callbacks.slice().forEach((fn) => {
					fn.call(component, event);
				});
				return !event.defaultPrevented;
			}
			return true;
		};
	}

	const dirty_components = [];
	const binding_callbacks = [];

	let render_callbacks = [];

	const flush_callbacks = [];

	const resolved_promise = /* @__PURE__ */ Promise.resolve();

	let update_scheduled = false;

	/** @returns {void} */
	function schedule_update() {
		if (!update_scheduled) {
			update_scheduled = true;
			resolved_promise.then(flush);
		}
	}

	/** @returns {void} */
	function add_render_callback(fn) {
		render_callbacks.push(fn);
	}

	/** @returns {void} */
	function add_flush_callback(fn) {
		flush_callbacks.push(fn);
	}

	// flush() calls callbacks in this order:
	// 1. All beforeUpdate callbacks, in order: parents before children
	// 2. All bind:this callbacks, in reverse order: children before parents.
	// 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
	//    for afterUpdates called during the initial onMount, which are called in
	//    reverse order: children before parents.
	// Since callbacks might update component values, which could trigger another
	// call to flush(), the following steps guard against this:
	// 1. During beforeUpdate, any updated components will be added to the
	//    dirty_components array and will cause a reentrant call to flush(). Because
	//    the flush index is kept outside the function, the reentrant call will pick
	//    up where the earlier call left off and go through all dirty components. The
	//    current_component value is saved and restored so that the reentrant call will
	//    not interfere with the "parent" flush() call.
	// 2. bind:this callbacks cannot trigger new flush() calls.
	// 3. During afterUpdate, any updated components will NOT have their afterUpdate
	//    callback called a second time; the seen_callbacks set, outside the flush()
	//    function, guarantees this behavior.
	const seen_callbacks = new Set();

	let flushidx = 0; // Do *not* move this inside the flush() function

	/** @returns {void} */
	function flush() {
		// Do not reenter flush while dirty components are updated, as this can
		// result in an infinite loop. Instead, let the inner flush handle it.
		// Reentrancy is ok afterwards for bindings etc.
		if (flushidx !== 0) {
			return;
		}
		const saved_component = current_component;
		do {
			// first, call beforeUpdate functions
			// and update components
			try {
				while (flushidx < dirty_components.length) {
					const component = dirty_components[flushidx];
					flushidx++;
					set_current_component(component);
					update(component.$$);
				}
			} catch (e) {
				// reset dirty state to not end up in a deadlocked state and then rethrow
				dirty_components.length = 0;
				flushidx = 0;
				throw e;
			}
			set_current_component(null);
			dirty_components.length = 0;
			flushidx = 0;
			while (binding_callbacks.length) binding_callbacks.pop()();
			// then, once components are updated, call
			// afterUpdate functions. This may cause
			// subsequent updates...
			for (let i = 0; i < render_callbacks.length; i += 1) {
				const callback = render_callbacks[i];
				if (!seen_callbacks.has(callback)) {
					// ...so guard against infinite loops
					seen_callbacks.add(callback);
					callback();
				}
			}
			render_callbacks.length = 0;
		} while (dirty_components.length);
		while (flush_callbacks.length) {
			flush_callbacks.pop()();
		}
		update_scheduled = false;
		seen_callbacks.clear();
		set_current_component(saved_component);
	}

	/** @returns {void} */
	function update($$) {
		if ($$.fragment !== null) {
			$$.update();
			run_all($$.before_update);
			const dirty = $$.dirty;
			$$.dirty = [-1];
			$$.fragment && $$.fragment.p($$.ctx, dirty);
			$$.after_update.forEach(add_render_callback);
		}
	}

	/**
	 * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
	 * @param {Function[]} fns
	 * @returns {void}
	 */
	function flush_render_callbacks(fns) {
		const filtered = [];
		const targets = [];
		render_callbacks.forEach((c) => (fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c)));
		targets.forEach((c) => c());
		render_callbacks = filtered;
	}

	const outroing = new Set();

	/**
	 * @type {Outro}
	 */
	let outros;

	/**
	 * @returns {void} */
	function group_outros() {
		outros = {
			r: 0,
			c: [],
			p: outros // parent group
		};
	}

	/**
	 * @returns {void} */
	function check_outros() {
		if (!outros.r) {
			run_all(outros.c);
		}
		outros = outros.p;
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} [local]
	 * @returns {void}
	 */
	function transition_in(block, local) {
		if (block && block.i) {
			outroing.delete(block);
			block.i(local);
		}
	}

	/**
	 * @param {import('./private.js').Fragment} block
	 * @param {0 | 1} local
	 * @param {0 | 1} [detach]
	 * @param {() => void} [callback]
	 * @returns {void}
	 */
	function transition_out(block, local, detach, callback) {
		if (block && block.o) {
			if (outroing.has(block)) return;
			outroing.add(block);
			outros.c.push(() => {
				outroing.delete(block);
				if (callback) {
					if (detach) block.d(1);
					callback();
				}
			});
			block.o(local);
		} else if (callback) {
			callback();
		}
	}

	/** @typedef {1} INTRO */
	/** @typedef {0} OUTRO */
	/** @typedef {{ direction: 'in' | 'out' | 'both' }} TransitionOptions */
	/** @typedef {(node: Element, params: any, options: TransitionOptions) => import('../transition/public.js').TransitionConfig} TransitionFn */

	/**
	 * @typedef {Object} Outro
	 * @property {number} r
	 * @property {Function[]} c
	 * @property {Object} p
	 */

	/**
	 * @typedef {Object} PendingProgram
	 * @property {number} start
	 * @property {INTRO|OUTRO} b
	 * @property {Outro} [group]
	 */

	/**
	 * @typedef {Object} Program
	 * @property {number} a
	 * @property {INTRO|OUTRO} b
	 * @property {1|-1} d
	 * @property {number} duration
	 * @property {number} start
	 * @property {number} end
	 * @property {Outro} [group]
	 */

	// general each functions:

	function ensure_array_like(array_like_or_iterator) {
		return array_like_or_iterator?.length !== undefined
			? array_like_or_iterator
			: Array.from(array_like_or_iterator);
	}

	/** @returns {void} */
	function bind(component, name, callback) {
		const index = component.$$.props[name];
		if (index !== undefined) {
			component.$$.bound[index] = callback;
			callback(component.$$.ctx[index]);
		}
	}

	/** @returns {void} */
	function create_component(block) {
		block && block.c();
	}

	/** @returns {void} */
	function mount_component(component, target, anchor) {
		const { fragment, after_update } = component.$$;
		fragment && fragment.m(target, anchor);
		// onMount happens before the initial afterUpdate
		add_render_callback(() => {
			const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
			// if the component was destroyed immediately
			// it will update the `$$.on_destroy` reference to `null`.
			// the destructured on_destroy may still reference to the old array
			if (component.$$.on_destroy) {
				component.$$.on_destroy.push(...new_on_destroy);
			} else {
				// Edge case - component was destroyed immediately,
				// most likely as a result of a binding initialising
				run_all(new_on_destroy);
			}
			component.$$.on_mount = [];
		});
		after_update.forEach(add_render_callback);
	}

	/** @returns {void} */
	function destroy_component(component, detaching) {
		const $$ = component.$$;
		if ($$.fragment !== null) {
			flush_render_callbacks($$.after_update);
			run_all($$.on_destroy);
			$$.fragment && $$.fragment.d(detaching);
			// TODO null out other refs, including component.$$ (but need to
			// preserve final state?)
			$$.on_destroy = $$.fragment = null;
			$$.ctx = [];
		}
	}

	/** @returns {void} */
	function make_dirty(component, i) {
		if (component.$$.dirty[0] === -1) {
			dirty_components.push(component);
			schedule_update();
			component.$$.dirty.fill(0);
		}
		component.$$.dirty[(i / 31) | 0] |= 1 << i % 31;
	}

	// TODO: Document the other params
	/**
	 * @param {SvelteComponent} component
	 * @param {import('./public.js').ComponentConstructorOptions} options
	 *
	 * @param {import('./utils.js')['not_equal']} not_equal Used to compare props and state values.
	 * @param {(target: Element | ShadowRoot) => void} [append_styles] Function that appends styles to the DOM when the component is first initialised.
	 * This will be the `add_css` function from the compiled component.
	 *
	 * @returns {void}
	 */
	function init(
		component,
		options,
		instance,
		create_fragment,
		not_equal,
		props,
		append_styles = null,
		dirty = [-1]
	) {
		const parent_component = current_component;
		set_current_component(component);
		/** @type {import('./private.js').T$$} */
		const $$ = (component.$$ = {
			fragment: null,
			ctx: [],
			// state
			props,
			update: noop$1,
			not_equal,
			bound: blank_object(),
			// lifecycle
			on_mount: [],
			on_destroy: [],
			on_disconnect: [],
			before_update: [],
			after_update: [],
			context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
			// everything else
			callbacks: blank_object(),
			dirty,
			skip_bound: false,
			root: options.target || parent_component.$$.root
		});
		append_styles && append_styles($$.root);
		let ready = false;
		$$.ctx = instance
			? instance(component, options.props || {}, (i, ret, ...rest) => {
					const value = rest.length ? rest[0] : ret;
					if ($$.ctx && not_equal($$.ctx[i], ($$.ctx[i] = value))) {
						if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
						if (ready) make_dirty(component, i);
					}
					return ret;
			  })
			: [];
		$$.update();
		ready = true;
		run_all($$.before_update);
		// `false` as a special case of no DOM component
		$$.fragment = create_fragment ? create_fragment($$.ctx) : false;
		if (options.target) {
			if (options.hydrate) {
				// TODO: what is the correct type here?
				// @ts-expect-error
				const nodes = children(options.target);
				$$.fragment && $$.fragment.l(nodes);
				nodes.forEach(detach);
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				$$.fragment && $$.fragment.c();
			}
			if (options.intro) transition_in(component.$$.fragment);
			mount_component(component, options.target, options.anchor);
			flush();
		}
		set_current_component(parent_component);
	}

	/**
	 * Base class for Svelte components. Used when dev=false.
	 *
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 */
	class SvelteComponent {
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$ = undefined;
		/**
		 * ### PRIVATE API
		 *
		 * Do not use, may change at any time
		 *
		 * @type {any}
		 */
		$$set = undefined;

		/** @returns {void} */
		$destroy() {
			destroy_component(this, 1);
			this.$destroy = noop$1;
		}

		/**
		 * @template {Extract<keyof Events, string>} K
		 * @param {K} type
		 * @param {((e: Events[K]) => void) | null | undefined} callback
		 * @returns {() => void}
		 */
		$on(type, callback) {
			if (!is_function(callback)) {
				return noop$1;
			}
			const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
			callbacks.push(callback);
			return () => {
				const index = callbacks.indexOf(callback);
				if (index !== -1) callbacks.splice(index, 1);
			};
		}

		/**
		 * @param {Partial<Props>} props
		 * @returns {void}
		 */
		$set(props) {
			if (this.$$set && !is_empty(props)) {
				this.$$.skip_bound = true;
				this.$$set(props);
				this.$$.skip_bound = false;
			}
		}
	}

	/**
	 * @typedef {Object} CustomElementPropDefinition
	 * @property {string} [attribute]
	 * @property {boolean} [reflect]
	 * @property {'String'|'Boolean'|'Number'|'Array'|'Object'} [type]
	 */

	// generated during release, do not modify

	/**
	 * The current version, as set in package.json.
	 *
	 * https://svelte.dev/docs/svelte-compiler#svelte-version
	 * @type {string}
	 */
	const VERSION = '4.2.12';
	const PUBLIC_VERSION = '4';

	/**
	 * @template T
	 * @param {string} type
	 * @param {T} [detail]
	 * @returns {void}
	 */
	function dispatch_dev(type, detail) {
		document.dispatchEvent(custom_event(type, { version: VERSION, ...detail }, { bubbles: true }));
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @returns {void}
	 */
	function append_dev(target, node) {
		dispatch_dev('SvelteDOMInsert', { target, node });
		append(target, node);
	}

	/**
	 * @param {Node} target
	 * @param {Node} node
	 * @param {Node} [anchor]
	 * @returns {void}
	 */
	function insert_dev(target, node, anchor) {
		dispatch_dev('SvelteDOMInsert', { target, node, anchor });
		insert(target, node, anchor);
	}

	/**
	 * @param {Node} node
	 * @returns {void}
	 */
	function detach_dev(node) {
		dispatch_dev('SvelteDOMRemove', { node });
		detach(node);
	}

	/**
	 * @param {Node} node
	 * @param {string} event
	 * @param {EventListenerOrEventListenerObject} handler
	 * @param {boolean | AddEventListenerOptions | EventListenerOptions} [options]
	 * @param {boolean} [has_prevent_default]
	 * @param {boolean} [has_stop_propagation]
	 * @param {boolean} [has_stop_immediate_propagation]
	 * @returns {() => void}
	 */
	function listen_dev(
		node,
		event,
		handler,
		options,
		has_prevent_default,
		has_stop_propagation,
		has_stop_immediate_propagation
	) {
		const modifiers =
			options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
		if (has_prevent_default) modifiers.push('preventDefault');
		if (has_stop_propagation) modifiers.push('stopPropagation');
		if (has_stop_immediate_propagation) modifiers.push('stopImmediatePropagation');
		dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
		const dispose = listen(node, event, handler, options);
		return () => {
			dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
			dispose();
		};
	}

	/**
	 * @param {Element} node
	 * @param {string} attribute
	 * @param {string} [value]
	 * @returns {void}
	 */
	function attr_dev(node, attribute, value) {
		attr(node, attribute, value);
		if (value == null) dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
		else dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
	}

	/**
	 * @param {Element} node
	 * @param {string} property
	 * @param {any} [value]
	 * @returns {void}
	 */
	function prop_dev(node, property, value) {
		node[property] = value;
		dispatch_dev('SvelteDOMSetProperty', { node, property, value });
	}

	/**
	 * @param {Text} text
	 * @param {unknown} data
	 * @returns {void}
	 */
	function set_data_dev(text, data) {
		data = '' + data;
		if (text.data === data) return;
		dispatch_dev('SvelteDOMSetData', { node: text, data });
		text.data = /** @type {string} */ (data);
	}

	function ensure_array_like_dev(arg) {
		if (
			typeof arg !== 'string' &&
			!(arg && typeof arg === 'object' && 'length' in arg) &&
			!(typeof Symbol === 'function' && arg && Symbol.iterator in arg)
		) {
			throw new Error('{#each} only works with iterable values.');
		}
		return ensure_array_like(arg);
	}

	/**
	 * @returns {void} */
	function validate_slots(name, slot, keys) {
		for (const slot_key of Object.keys(slot)) {
			if (!~keys.indexOf(slot_key)) {
				console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
			}
		}
	}

	/**
	 * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
	 *
	 * Can be used to create strongly typed Svelte components.
	 *
	 * #### Example:
	 *
	 * You have component library on npm called `component-library`, from which
	 * you export a component called `MyComponent`. For Svelte+TypeScript users,
	 * you want to provide typings. Therefore you create a `index.d.ts`:
	 * ```ts
	 * import { SvelteComponent } from "svelte";
	 * export class MyComponent extends SvelteComponent<{foo: string}> {}
	 * ```
	 * Typing this makes it possible for IDEs like VS Code with the Svelte extension
	 * to provide intellisense and to use the component like this in a Svelte file
	 * with TypeScript:
	 * ```svelte
	 * <script lang="ts">
	 * 	import { MyComponent } from "component-library";
	 * </script>
	 * <MyComponent foo={'bar'} />
	 * ```
	 * @template {Record<string, any>} [Props=any]
	 * @template {Record<string, any>} [Events=any]
	 * @template {Record<string, any>} [Slots=any]
	 * @extends {SvelteComponent<Props, Events>}
	 */
	class SvelteComponentDev extends SvelteComponent {
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Props}
		 */
		$$prop_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Events}
		 */
		$$events_def;
		/**
		 * For type checking capabilities only.
		 * Does not exist at runtime.
		 * ### DO NOT USE!
		 *
		 * @type {Slots}
		 */
		$$slot_def;

		/** @param {import('./public.js').ComponentConstructorOptions<Props>} options */
		constructor(options) {
			if (!options || (!options.target && !options.$$inline)) {
				throw new Error("'target' is a required option");
			}
			super();
		}

		/** @returns {void} */
		$destroy() {
			super.$destroy();
			this.$destroy = () => {
				console.warn('Component was already destroyed'); // eslint-disable-line no-console
			};
		}

		/** @returns {void} */
		$capture_state() {}

		/** @returns {void} */
		$inject_state() {}
	}

	if (typeof window !== 'undefined')
		// @ts-ignore
		(window.__svelte || (window.__svelte = { v: new Set() })).v.add(PUBLIC_VERSION);

	// Material Design Icons v7.4.47
	var mdiAccessPoint = "M4.93,4.93C3.12,6.74 2,9.24 2,12C2,14.76 3.12,17.26 4.93,19.07L6.34,17.66C4.89,16.22 4,14.22 4,12C4,9.79 4.89,7.78 6.34,6.34L4.93,4.93M19.07,4.93L17.66,6.34C19.11,7.78 20,9.79 20,12C20,14.22 19.11,16.22 17.66,17.66L19.07,19.07C20.88,17.26 22,14.76 22,12C22,9.24 20.88,6.74 19.07,4.93M7.76,7.76C6.67,8.85 6,10.35 6,12C6,13.65 6.67,15.15 7.76,16.24L9.17,14.83C8.45,14.11 8,13.11 8,12C8,10.89 8.45,9.89 9.17,9.17L7.76,7.76M16.24,7.76L14.83,9.17C15.55,9.89 16,10.89 16,12C16,13.11 15.55,14.11 14.83,14.83L16.24,16.24C17.33,15.15 18,13.65 18,12C18,10.35 17.33,8.85 16.24,7.76M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z";
	var mdiAccessPointOff = "M20.84 22.73L12.1 14C12.06 14 12.03 14 12 14C10.9 14 10 13.11 10 12C10 11.97 10 11.94 10 11.9L8.4 10.29C8.15 10.81 8 11.38 8 12C8 13.11 8.45 14.11 9.17 14.83L7.76 16.24C6.67 15.15 6 13.65 6 12C6 10.83 6.34 9.74 6.93 8.82L5.5 7.37C4.55 8.67 4 10.27 4 12C4 14.22 4.89 16.22 6.34 17.66L4.93 19.07C3.12 17.26 2 14.76 2 12C2 9.72 2.77 7.63 4.06 5.95L1.11 3L2.39 1.73L22.11 21.46L20.84 22.73M15.93 12.73L17.53 14.33C17.83 13.61 18 12.83 18 12C18 10.35 17.33 8.85 16.24 7.76L14.83 9.17C15.55 9.89 16 10.89 16 12C16 12.25 15.97 12.5 15.93 12.73M19.03 15.83L20.5 17.28C21.44 15.75 22 13.94 22 12C22 9.24 20.88 6.74 19.07 4.93L17.66 6.34C19.11 7.78 20 9.79 20 12C20 13.39 19.65 14.7 19.03 15.83Z";
	var mdiArrowSplitHorizontal = "M8,18H11V15H2V13H22V15H13V18H16L12,22L8,18M12,2L8,6H11V9H2V11H22V9H13V6H16L12,2Z";
	var mdiBorderVertical = "M15,13H17V11H15M15,21H17V19H15M15,5H17V3H15M19,9H21V7H19M19,5H21V3H19M19,13H21V11H19M19,21H21V19H19M11,21H13V3H11M19,17H21V15H19M7,5H9V3H7M3,17H5V15H3M3,21H5V19H3M3,13H5V11H3M7,13H9V11H7M7,21H9V19H7M3,5H5V3H3M3,9H5V7H3V9Z";
	var mdiCamera = "M4,4H7L9,2H15L17,4H20A2,2 0 0,1 22,6V18A2,2 0 0,1 20,20H4A2,2 0 0,1 2,18V6A2,2 0 0,1 4,4M12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12A5,5 0 0,0 12,7M12,9A3,3 0 0,1 15,12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9Z";
	var mdiCameraOff = "M1.2,4.47L2.5,3.2L20,20.72L18.73,22L16.73,20H4A2,2 0 0,1 2,18V6C2,5.78 2.04,5.57 2.1,5.37L1.2,4.47M7,4L9,2H15L17,4H20A2,2 0 0,1 22,6V18C22,18.6 21.74,19.13 21.32,19.5L16.33,14.5C16.76,13.77 17,12.91 17,12A5,5 0 0,0 12,7C11.09,7 10.23,7.24 9.5,7.67L5.82,4H7M7,12A5,5 0 0,0 12,17C12.5,17 13.03,16.92 13.5,16.77L11.72,15C10.29,14.85 9.15,13.71 9,12.28L7.23,10.5C7.08,10.97 7,11.5 7,12M12,9A3,3 0 0,1 15,12C15,12.35 14.94,12.69 14.83,13L11,9.17C11.31,9.06 11.65,9 12,9Z";
	var mdiConnection = "M21.4 7.5C22.2 8.3 22.2 9.6 21.4 10.3L18.6 13.1L10.8 5.3L13.6 2.5C14.4 1.7 15.7 1.7 16.4 2.5L18.2 4.3L21.2 1.3L22.6 2.7L19.6 5.7L21.4 7.5M15.6 13.3L14.2 11.9L11.4 14.7L9.3 12.6L12.1 9.8L10.7 8.4L7.9 11.2L6.4 9.8L3.6 12.6C2.8 13.4 2.8 14.7 3.6 15.4L5.4 17.2L1.4 21.2L2.8 22.6L6.8 18.6L8.6 20.4C9.4 21.2 10.7 21.2 11.4 20.4L14.2 17.6L12.8 16.2L15.6 13.3Z";
	var mdiFullscreen = "M5,5H10V7H7V10H5V5M14,5H19V10H17V7H14V5M17,14H19V19H14V17H17V14M10,17V19H5V14H7V17H10Z";
	var mdiFullscreenExit = "M14,14H19V16H16V19H14V14M5,14H10V19H8V16H5V14M8,5H10V10H5V8H8V5M19,8V10H14V5H16V8H19Z";
	var mdiImageEdit = "M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M21 5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H11V19.1L12.1 18H5L8.5 13.5L11 16.5L14.5 12L16.1 14.1L21 9.1V5Z";
	var mdiImageEditOutline = "M22.7 14.3L21.7 15.3L19.7 13.3L20.7 12.3C20.8 12.2 20.9 12.1 21.1 12.1C21.2 12.1 21.4 12.2 21.5 12.3L22.8 13.6C22.9 13.8 22.9 14.1 22.7 14.3M13 19.9V22H15.1L21.2 15.9L19.2 13.9L13 19.9M11.21 15.83L9.25 13.47L6.5 17H13.12L15.66 14.55L13.96 12.29L11.21 15.83M11 19.9V19.05L11.05 19H5V5H19V11.31L21 9.38V5C21 3.9 20.11 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.11 3.9 21 5 21H11V19.9Z";
	var mdiMotionPlay = "M22 12C22 6.46 17.54 2 12 2C10.83 2 9.7 2.19 8.62 2.56L9.32 4.5C10.17 4.16 11.06 3.97 12 3.97C16.41 3.97 20.03 7.59 20.03 12C20.03 16.41 16.41 20.03 12 20.03C7.59 20.03 3.97 16.41 3.97 12C3.97 11.06 4.16 10.12 4.5 9.28L2.56 8.62C2.19 9.7 2 10.83 2 12C2 17.54 6.46 22 12 22C17.54 22 22 17.54 22 12M5.47 3.97C6.32 3.97 7 4.68 7 5.47C7 6.32 6.32 7 5.47 7C4.68 7 3.97 6.32 3.97 5.47C3.97 4.68 4.68 3.97 5.47 3.97M18 12C18 8.67 15.33 6 12 6C8.67 6 6 8.67 6 12C6 15.33 8.67 18 12 18C15.33 18 18 15.33 18 12M15 12L10 15V9";
	var mdiMotionPlayOutline = "M10 16.5L16 12L10 7.5M22 12C22 6.46 17.54 2 12 2C10.83 2 9.7 2.19 8.62 2.56L9.32 4.5C10.17 4.16 11.06 3.97 12 3.97C16.41 3.97 20.03 7.59 20.03 12C20.03 16.41 16.41 20.03 12 20.03C7.59 20.03 3.97 16.41 3.97 12C3.97 11.06 4.16 10.12 4.5 9.28L2.56 8.62C2.19 9.7 2 10.83 2 12C2 17.54 6.46 22 12 22C17.54 22 22 17.54 22 12M5.47 3.97C6.32 3.97 7 4.68 7 5.47C7 6.32 6.32 7 5.47 7C4.68 7 3.97 6.32 3.97 5.47C3.97 4.68 4.68 3.97 5.47 3.97Z";
	var mdiPause = "M14,19H18V5H14M6,19H10V5H6V19Z";
	var mdiPlayPause = "M3,5V19L11,12M13,19H16V5H13M18,5V19H21V5";
	var mdiRecord = "M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z";
	var mdiSquareRoundedBadge = "M19.5 8C21.43 8 23 6.43 23 4.5C23 2.57 21.43 1 19.5 1C17.57 1 16 2.57 16 4.5C16 6.43 17.57 8 19.5 8M19.5 10C20 10 20.5 9.93 21 9.79V16C21 18.76 18.76 21 16 21H8C5.24 21 3 18.76 3 16V8C3 5.24 5.24 3 8 3H14.21C14.07 3.5 14 4 14 4.5C14 7.54 16.46 10 19.5 10Z";
	var mdiSquareRoundedBadgeOutline = "M19.5 8C21.43 8 23 6.43 23 4.5C23 2.57 21.43 1 19.5 1C17.57 1 16 2.57 16 4.5C16 6.43 17.57 8 19.5 8M21 16V9.79C20.5 9.93 20 10 19.5 10C19.33 10 19.17 10 19 10V16C19 17.66 17.66 19 16 19H8C6.34 19 5 17.66 5 16V8C5 6.34 6.34 5 8 5H14C14 4.84 14 4.67 14 4.5C14 4 14.07 3.5 14.21 3H8C5.24 3 3 5.24 3 8V16C3 18.76 5.24 21 8 21H16C18.76 21 21 18.76 21 16Z";
	var mdiStop = "M18,18H6V6H18V18Z";

	/* node_modules/mdi-svelte/src/Index.svelte generated by Svelte v4.2.12 */
	const file$7 = "node_modules/mdi-svelte/src/Index.svelte";

	// (59:0) {#if title}
	function create_if_block_2$1(ctx) {
		let title_1;
		let t;

		const block = {
			c: function create() {
				title_1 = svg_element("title");
				t = text(/*title*/ ctx[2]);
				add_location(title_1, file$7, 58, 11, 1419);
			},
			m: function mount(target, anchor) {
				insert_dev(target, title_1, anchor);
				append_dev(title_1, t);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*title*/ 4) set_data_dev(t, /*title*/ ctx[2]);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(title_1);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_2$1.name,
			type: "if",
			source: "(59:0) {#if title}",
			ctx
		});

		return block;
	}

	// (69:3) {:else}
	function create_else_block_1$1(ctx) {
		let path_1;

		const block = {
			c: function create() {
				path_1 = svg_element("path");
				attr_dev(path_1, "d", /*path*/ ctx[0]);
				add_location(path_1, file$7, 69, 2, 1802);
			},
			m: function mount(target, anchor) {
				insert_dev(target, path_1, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*path*/ 1) {
					attr_dev(path_1, "d", /*path*/ ctx[0]);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(path_1);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_1$1.name,
			type: "else",
			source: "(69:3) {:else}",
			ctx
		});

		return block;
	}

	// (60:0) {#if spin !== false}
	function create_if_block$4(ctx) {
		let g;
		let path_1;
		let g_style_value;

		function select_block_type_1(ctx, dirty) {
			if (/*inverse*/ ctx[3]) return create_if_block_1$2;
			return create_else_block$2;
		}

		let current_block_type = select_block_type_1(ctx);
		let if_block = current_block_type(ctx);

		const block = {
			c: function create() {
				if_block.c();
				g = svg_element("g");
				path_1 = svg_element("path");
				attr_dev(path_1, "d", /*path*/ ctx[0]);
				add_location(path_1, file$7, 66, 6, 1757);
				attr_dev(g, "style", g_style_value = `animation: ${/*spinfunc*/ ctx[5]} linear ${/*spintime*/ ctx[6]}s infinite; transform-origin: center`);
				add_location(g, file$7, 65, 4, 1659);
			},
			m: function mount(target, anchor) {
				if_block.m(target, anchor);
				insert_dev(target, g, anchor);
				append_dev(g, path_1);
			},
			p: function update(ctx, dirty) {
				if (current_block_type !== (current_block_type = select_block_type_1(ctx))) {
					if_block.d(1);
					if_block = current_block_type(ctx);

					if (if_block) {
						if_block.c();
						if_block.m(g.parentNode, g);
					}
				}

				if (dirty & /*path*/ 1) {
					attr_dev(path_1, "d", /*path*/ ctx[0]);
				}

				if (dirty & /*spinfunc, spintime*/ 96 && g_style_value !== (g_style_value = `animation: ${/*spinfunc*/ ctx[5]} linear ${/*spintime*/ ctx[6]}s infinite; transform-origin: center`)) {
					attr_dev(g, "style", g_style_value);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(g);
				}

				if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block$4.name,
			type: "if",
			source: "(60:0) {#if spin !== false}",
			ctx
		});

		return block;
	}

	// (63:2) {:else}
	function create_else_block$2(ctx) {
		let style_1;
		let t;

		const block = {
			c: function create() {
				style_1 = svg_element("style");
				t = text("@keyframes spin { to { transform: rotate(360deg) } }");
				add_location(style_1, file$7, 63, 4, 1579);
			},
			m: function mount(target, anchor) {
				insert_dev(target, style_1, anchor);
				append_dev(style_1, t);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(style_1);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block$2.name,
			type: "else",
			source: "(63:2) {:else}",
			ctx
		});

		return block;
	}

	// (61:2) {#if inverse}
	function create_if_block_1$2(ctx) {
		let style_1;
		let t;

		const block = {
			c: function create() {
				style_1 = svg_element("style");
				t = text("@keyframes spin-inverse { to { transform: rotate(-360deg) } }");
				add_location(style_1, file$7, 61, 4, 1488);
			},
			m: function mount(target, anchor) {
				insert_dev(target, style_1, anchor);
				append_dev(style_1, t);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(style_1);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_1$2.name,
			type: "if",
			source: "(61:2) {#if inverse}",
			ctx
		});

		return block;
	}

	function create_fragment$7(ctx) {
		let svg;
		let if_block0_anchor;
		let if_block0 = /*title*/ ctx[2] && create_if_block_2$1(ctx);

		function select_block_type(ctx, dirty) {
			if (/*spin*/ ctx[1] !== false) return create_if_block$4;
			return create_else_block_1$1;
		}

		let current_block_type = select_block_type(ctx);
		let if_block1 = current_block_type(ctx);

		const block = {
			c: function create() {
				svg = svg_element("svg");
				if (if_block0) if_block0.c();
				if_block0_anchor = empty();
				if_block1.c();
				attr_dev(svg, "viewBox", "0 0 24 24");
				attr_dev(svg, "style", /*style*/ ctx[4]);
				attr_dev(svg, "class", "svelte-dmmfjb");
				add_location(svg, file$7, 57, 0, 1374);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, svg, anchor);
				if (if_block0) if_block0.m(svg, null);
				append_dev(svg, if_block0_anchor);
				if_block1.m(svg, null);
			},
			p: function update(ctx, [dirty]) {
				if (/*title*/ ctx[2]) {
					if (if_block0) {
						if_block0.p(ctx, dirty);
					} else {
						if_block0 = create_if_block_2$1(ctx);
						if_block0.c();
						if_block0.m(svg, if_block0_anchor);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block1) {
					if_block1.p(ctx, dirty);
				} else {
					if_block1.d(1);
					if_block1 = current_block_type(ctx);

					if (if_block1) {
						if_block1.c();
						if_block1.m(svg, null);
					}
				}

				if (dirty & /*style*/ 16) {
					attr_dev(svg, "style", /*style*/ ctx[4]);
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(svg);
				}

				if (if_block0) if_block0.d();
				if_block1.d();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$7.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$7($$self, $$props, $$invalidate) {
		let inverse;
		let spintime;
		let spinfunc;
		let style;
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('Index', slots, []);
		let { path } = $$props;
		let { size = 1 } = $$props;
		let { color = null } = $$props;
		let { flip = null } = $$props;
		let { rotate = 0 } = $$props;
		let { spin = false } = $$props;
		let { title = '' } = $$props;

		// size
		if (Number(size)) size = Number(size);

		const getStyles = () => {
			const transform = [];
			const styles = [];

			if (size !== null) {
				const width = typeof size === "string" ? size : `${size * 1.5}rem`;
				styles.push(['width', width]);
				styles.push(['height', width]);
			}

			styles.push(['fill', color !== null ? color : 'currentColor']);

			if (flip === true || flip === 'h') {
				transform.push("scaleX(-1)");
			}

			if (flip === true || flip === 'v') {
				transform.push("scaleY(-1)");
			}

			if (rotate != 0) {
				transform.push(`rotate(${rotate}deg)`);
			}

			if (transform.length > 0) {
				styles.push(['transform', transform.join(' ')]);
				styles.push(['transform-origin', 'center']);
			}

			return styles.reduce(
				(cur, item) => {
					return `${cur} ${item[0]}:${item[1]};`;
				},
				''
			);
		};

		$$self.$$.on_mount.push(function () {
			if (path === undefined && !('path' in $$props || $$self.$$.bound[$$self.$$.props['path']])) {
				console.warn("<Index> was created without expected prop 'path'");
			}
		});

		const writable_props = ['path', 'size', 'color', 'flip', 'rotate', 'spin', 'title'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Index> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('path' in $$props) $$invalidate(0, path = $$props.path);
			if ('size' in $$props) $$invalidate(7, size = $$props.size);
			if ('color' in $$props) $$invalidate(8, color = $$props.color);
			if ('flip' in $$props) $$invalidate(9, flip = $$props.flip);
			if ('rotate' in $$props) $$invalidate(10, rotate = $$props.rotate);
			if ('spin' in $$props) $$invalidate(1, spin = $$props.spin);
			if ('title' in $$props) $$invalidate(2, title = $$props.title);
		};

		$$self.$capture_state = () => ({
			path,
			size,
			color,
			flip,
			rotate,
			spin,
			title,
			getStyles,
			style,
			inverse,
			spinfunc,
			spintime
		});

		$$self.$inject_state = $$props => {
			if ('path' in $$props) $$invalidate(0, path = $$props.path);
			if ('size' in $$props) $$invalidate(7, size = $$props.size);
			if ('color' in $$props) $$invalidate(8, color = $$props.color);
			if ('flip' in $$props) $$invalidate(9, flip = $$props.flip);
			if ('rotate' in $$props) $$invalidate(10, rotate = $$props.rotate);
			if ('spin' in $$props) $$invalidate(1, spin = $$props.spin);
			if ('title' in $$props) $$invalidate(2, title = $$props.title);
			if ('style' in $$props) $$invalidate(4, style = $$props.style);
			if ('inverse' in $$props) $$invalidate(3, inverse = $$props.inverse);
			if ('spinfunc' in $$props) $$invalidate(5, spinfunc = $$props.spinfunc);
			if ('spintime' in $$props) $$invalidate(6, spintime = $$props.spintime);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*spin*/ 2) {
				// SPIN properties
				$$invalidate(3, inverse = typeof spin !== "boolean" && spin < 0 ? true : false);
			}

			if ($$self.$$.dirty & /*spin*/ 2) {
				$$invalidate(6, spintime = Math.abs(spin === true ? 2 : spin));
			}

			if ($$self.$$.dirty & /*inverse*/ 8) {
				$$invalidate(5, spinfunc = inverse ? 'spin-inverse' : 'spin');
			}

			if ($$self.$$.dirty & /*size, color, flip, rotate*/ 1920) {
				$$invalidate(4, style = getStyles());
			}
		};

		return [
			path,
			spin,
			title,
			inverse,
			style,
			spinfunc,
			spintime,
			size,
			color,
			flip,
			rotate
		];
	}

	class Index extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance$7, create_fragment$7, safe_not_equal, {
				path: 0,
				size: 7,
				color: 8,
				flip: 9,
				rotate: 10,
				spin: 1,
				title: 2
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "Index",
				options,
				id: create_fragment$7.name
			});
		}

		get path() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set path(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get size() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set size(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get color() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set color(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get flip() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set flip(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get rotate() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set rotate(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get spin() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set spin(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get title() {
			throw new Error("<Index>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set title(value) {
			throw new Error("<Index>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	const semver = /^[v^~<>=]*?(\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+)(?:\.([x*]|\d+))?(?:-([\da-z\-]+(?:\.[\da-z\-]+)*))?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?)?)?$/i;
	const validateAndParse = (version) => {
	    if (typeof version !== 'string') {
	        throw new TypeError('Invalid argument expected string');
	    }
	    const match = version.match(semver);
	    if (!match) {
	        throw new Error(`Invalid argument not valid semver ('${version}' received)`);
	    }
	    match.shift();
	    return match;
	};
	const isWildcard = (s) => s === '*' || s === 'x' || s === 'X';
	const tryParse = (v) => {
	    const n = parseInt(v, 10);
	    return isNaN(n) ? v : n;
	};
	const forceType = (a, b) => typeof a !== typeof b ? [String(a), String(b)] : [a, b];
	const compareStrings = (a, b) => {
	    if (isWildcard(a) || isWildcard(b))
	        return 0;
	    const [ap, bp] = forceType(tryParse(a), tryParse(b));
	    if (ap > bp)
	        return 1;
	    if (ap < bp)
	        return -1;
	    return 0;
	};
	const compareSegments = (a, b) => {
	    for (let i = 0; i < Math.max(a.length, b.length); i++) {
	        const r = compareStrings(a[i] || '0', b[i] || '0');
	        if (r !== 0)
	            return r;
	    }
	    return 0;
	};

	/**
	 * Compare [semver](https://semver.org/) version strings to find greater, equal or lesser.
	 * This library supports the full semver specification, including comparing versions with different number of digits like `1.0.0`, `1.0`, `1`, and pre-release versions like `1.0.0-alpha`.
	 * @param v1 - First version to compare
	 * @param v2 - Second version to compare
	 * @returns Numeric value compatible with the [Array.sort(fn) interface](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#Parameters).
	 */
	const compareVersions = (v1, v2) => {
	    // validate input and split into segments
	    const n1 = validateAndParse(v1);
	    const n2 = validateAndParse(v2);
	    // pop off the patch
	    const p1 = n1.pop();
	    const p2 = n2.pop();
	    // validate numbers
	    const r = compareSegments(n1, n2);
	    if (r !== 0)
	        return r;
	    // validate pre-release
	    if (p1 && p2) {
	        return compareSegments(p1.split('.'), p2.split('.'));
	    }
	    else if (p1 || p2) {
	        return p1 ? -1 : 1;
	    }
	    return 0;
	};

	// shim for using process in browser
	// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	var cachedSetTimeout = defaultSetTimout;
	var cachedClearTimeout = defaultClearTimeout;
	if (typeof global$1.setTimeout === 'function') {
	    cachedSetTimeout = setTimeout;
	}
	if (typeof global$1.clearTimeout === 'function') {
	    cachedClearTimeout = clearTimeout;
	}

	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}
	function nextTick(fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	}
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	var title = 'browser';
	var platform = 'browser';
	var browser$1 = true;
	var env = {};
	var argv = [];
	var version = ''; // empty string to avoid regexp issues
	var versions = {};
	var release = {};
	var config = {};

	function noop() {}

	var on = noop;
	var addListener = noop;
	var once = noop;
	var off = noop;
	var removeListener = noop;
	var removeAllListeners = noop;
	var emit = noop;

	function binding(name) {
	    throw new Error('process.binding is not supported');
	}

	function cwd () { return '/' }
	function chdir (dir) {
	    throw new Error('process.chdir is not supported');
	}function umask() { return 0; }

	// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
	var performance = global$1.performance || {};
	var performanceNow =
	  performance.now        ||
	  performance.mozNow     ||
	  performance.msNow      ||
	  performance.oNow       ||
	  performance.webkitNow  ||
	  function(){ return (new Date()).getTime() };

	// generate timestamp or delta
	// see http://nodejs.org/api/process.html#process_process_hrtime
	function hrtime(previousTimestamp){
	  var clocktime = performanceNow.call(performance)*1e-3;
	  var seconds = Math.floor(clocktime);
	  var nanoseconds = Math.floor((clocktime%1)*1e9);
	  if (previousTimestamp) {
	    seconds = seconds - previousTimestamp[0];
	    nanoseconds = nanoseconds - previousTimestamp[1];
	    if (nanoseconds<0) {
	      seconds--;
	      nanoseconds += 1e9;
	    }
	  }
	  return [seconds,nanoseconds]
	}

	var startTime = new Date();
	function uptime() {
	  var currentTime = new Date();
	  var dif = currentTime - startTime;
	  return dif / 1000;
	}

	var browser$1$1 = {
	  nextTick: nextTick,
	  title: title,
	  browser: browser$1,
	  env: env,
	  argv: argv,
	  version: version,
	  versions: versions,
	  on: on,
	  addListener: addListener,
	  once: once,
	  off: off,
	  removeListener: removeListener,
	  removeAllListeners: removeAllListeners,
	  emit: emit,
	  binding: binding,
	  cwd: cwd,
	  chdir: chdir,
	  umask: umask,
	  hrtime: hrtime,
	  platform: platform,
	  release: release,
	  config: config,
	  uptime: uptime
	};

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
		Object.keys(n).forEach(function (k) {
			var d = Object.getOwnPropertyDescriptor(n, k);
			Object.defineProperty(a, k, d.get ? d : {
				enumerable: true,
				get: function () {
					return n[k];
				}
			});
		});
		return a;
	}

	var browser = {exports: {}};

	/**
	 * Helpers.
	 */

	var ms;
	var hasRequiredMs;

	function requireMs () {
		if (hasRequiredMs) return ms;
		hasRequiredMs = 1;
		var s = 1000;
		var m = s * 60;
		var h = m * 60;
		var d = h * 24;
		var w = d * 7;
		var y = d * 365.25;

		/**
		 * Parse or format the given `val`.
		 *
		 * Options:
		 *
		 *  - `long` verbose formatting [false]
		 *
		 * @param {String|Number} val
		 * @param {Object} [options]
		 * @throws {Error} throw an error if val is not a non-empty string or a number
		 * @return {String|Number}
		 * @api public
		 */

		ms = function(val, options) {
		  options = options || {};
		  var type = typeof val;
		  if (type === 'string' && val.length > 0) {
		    return parse(val);
		  } else if (type === 'number' && isFinite(val)) {
		    return options.long ? fmtLong(val) : fmtShort(val);
		  }
		  throw new Error(
		    'val is not a non-empty string or a valid number. val=' +
		      JSON.stringify(val)
		  );
		};

		/**
		 * Parse the given `str` and return milliseconds.
		 *
		 * @param {String} str
		 * @return {Number}
		 * @api private
		 */

		function parse(str) {
		  str = String(str);
		  if (str.length > 100) {
		    return;
		  }
		  var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
		    str
		  );
		  if (!match) {
		    return;
		  }
		  var n = parseFloat(match[1]);
		  var type = (match[2] || 'ms').toLowerCase();
		  switch (type) {
		    case 'years':
		    case 'year':
		    case 'yrs':
		    case 'yr':
		    case 'y':
		      return n * y;
		    case 'weeks':
		    case 'week':
		    case 'w':
		      return n * w;
		    case 'days':
		    case 'day':
		    case 'd':
		      return n * d;
		    case 'hours':
		    case 'hour':
		    case 'hrs':
		    case 'hr':
		    case 'h':
		      return n * h;
		    case 'minutes':
		    case 'minute':
		    case 'mins':
		    case 'min':
		    case 'm':
		      return n * m;
		    case 'seconds':
		    case 'second':
		    case 'secs':
		    case 'sec':
		    case 's':
		      return n * s;
		    case 'milliseconds':
		    case 'millisecond':
		    case 'msecs':
		    case 'msec':
		    case 'ms':
		      return n;
		    default:
		      return undefined;
		  }
		}

		/**
		 * Short format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtShort(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return Math.round(ms / d) + 'd';
		  }
		  if (msAbs >= h) {
		    return Math.round(ms / h) + 'h';
		  }
		  if (msAbs >= m) {
		    return Math.round(ms / m) + 'm';
		  }
		  if (msAbs >= s) {
		    return Math.round(ms / s) + 's';
		  }
		  return ms + 'ms';
		}

		/**
		 * Long format for `ms`.
		 *
		 * @param {Number} ms
		 * @return {String}
		 * @api private
		 */

		function fmtLong(ms) {
		  var msAbs = Math.abs(ms);
		  if (msAbs >= d) {
		    return plural(ms, msAbs, d, 'day');
		  }
		  if (msAbs >= h) {
		    return plural(ms, msAbs, h, 'hour');
		  }
		  if (msAbs >= m) {
		    return plural(ms, msAbs, m, 'minute');
		  }
		  if (msAbs >= s) {
		    return plural(ms, msAbs, s, 'second');
		  }
		  return ms + ' ms';
		}

		/**
		 * Pluralization helper.
		 */

		function plural(ms, msAbs, n, name) {
		  var isPlural = msAbs >= n * 1.5;
		  return Math.round(ms / n) + ' ' + name + (isPlural ? 's' : '');
		}
		return ms;
	}

	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 */

	function setup(env) {
		createDebug.debug = createDebug;
		createDebug.default = createDebug;
		createDebug.coerce = coerce;
		createDebug.disable = disable;
		createDebug.enable = enable;
		createDebug.enabled = enabled;
		createDebug.humanize = requireMs();
		createDebug.destroy = destroy;

		Object.keys(env).forEach(key => {
			createDebug[key] = env[key];
		});

		/**
		* The currently active debug mode names, and names to skip.
		*/

		createDebug.names = [];
		createDebug.skips = [];

		/**
		* Map of special "%n" handling functions, for the debug "format" argument.
		*
		* Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
		*/
		createDebug.formatters = {};

		/**
		* Selects a color for a debug namespace
		* @param {String} namespace The namespace string for the debug instance to be colored
		* @return {Number|String} An ANSI color code for the given namespace
		* @api private
		*/
		function selectColor(namespace) {
			let hash = 0;

			for (let i = 0; i < namespace.length; i++) {
				hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
				hash |= 0; // Convert to 32bit integer
			}

			return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
		}
		createDebug.selectColor = selectColor;

		/**
		* Create a debugger with the given `namespace`.
		*
		* @param {String} namespace
		* @return {Function}
		* @api public
		*/
		function createDebug(namespace) {
			let prevTime;
			let enableOverride = null;
			let namespacesCache;
			let enabledCache;

			function debug(...args) {
				// Disabled?
				if (!debug.enabled) {
					return;
				}

				const self = debug;

				// Set `diff` timestamp
				const curr = Number(new Date());
				const ms = curr - (prevTime || curr);
				self.diff = ms;
				self.prev = prevTime;
				self.curr = curr;
				prevTime = curr;

				args[0] = createDebug.coerce(args[0]);

				if (typeof args[0] !== 'string') {
					// Anything else let's inspect with %O
					args.unshift('%O');
				}

				// Apply any `formatters` transformations
				let index = 0;
				args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
					// If we encounter an escaped % then don't increase the array index
					if (match === '%%') {
						return '%';
					}
					index++;
					const formatter = createDebug.formatters[format];
					if (typeof formatter === 'function') {
						const val = args[index];
						match = formatter.call(self, val);

						// Now we need to remove `args[index]` since it's inlined in the `format`
						args.splice(index, 1);
						index--;
					}
					return match;
				});

				// Apply env-specific formatting (colors, etc.)
				createDebug.formatArgs.call(self, args);

				const logFn = self.log || createDebug.log;
				logFn.apply(self, args);
			}

			debug.namespace = namespace;
			debug.useColors = createDebug.useColors();
			debug.color = createDebug.selectColor(namespace);
			debug.extend = extend;
			debug.destroy = createDebug.destroy; // XXX Temporary. Will be removed in the next major release.

			Object.defineProperty(debug, 'enabled', {
				enumerable: true,
				configurable: false,
				get: () => {
					if (enableOverride !== null) {
						return enableOverride;
					}
					if (namespacesCache !== createDebug.namespaces) {
						namespacesCache = createDebug.namespaces;
						enabledCache = createDebug.enabled(namespace);
					}

					return enabledCache;
				},
				set: v => {
					enableOverride = v;
				}
			});

			// Env-specific initialization logic for debug instances
			if (typeof createDebug.init === 'function') {
				createDebug.init(debug);
			}

			return debug;
		}

		function extend(namespace, delimiter) {
			const newDebug = createDebug(this.namespace + (typeof delimiter === 'undefined' ? ':' : delimiter) + namespace);
			newDebug.log = this.log;
			return newDebug;
		}

		/**
		* Enables a debug mode by namespaces. This can include modes
		* separated by a colon and wildcards.
		*
		* @param {String} namespaces
		* @api public
		*/
		function enable(namespaces) {
			createDebug.save(namespaces);
			createDebug.namespaces = namespaces;

			createDebug.names = [];
			createDebug.skips = [];

			let i;
			const split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
			const len = split.length;

			for (i = 0; i < len; i++) {
				if (!split[i]) {
					// ignore empty strings
					continue;
				}

				namespaces = split[i].replace(/\*/g, '.*?');

				if (namespaces[0] === '-') {
					createDebug.skips.push(new RegExp('^' + namespaces.slice(1) + '$'));
				} else {
					createDebug.names.push(new RegExp('^' + namespaces + '$'));
				}
			}
		}

		/**
		* Disable debug output.
		*
		* @return {String} namespaces
		* @api public
		*/
		function disable() {
			const namespaces = [
				...createDebug.names.map(toNamespace),
				...createDebug.skips.map(toNamespace).map(namespace => '-' + namespace)
			].join(',');
			createDebug.enable('');
			return namespaces;
		}

		/**
		* Returns true if the given mode name is enabled, false otherwise.
		*
		* @param {String} name
		* @return {Boolean}
		* @api public
		*/
		function enabled(name) {
			if (name[name.length - 1] === '*') {
				return true;
			}

			let i;
			let len;

			for (i = 0, len = createDebug.skips.length; i < len; i++) {
				if (createDebug.skips[i].test(name)) {
					return false;
				}
			}

			for (i = 0, len = createDebug.names.length; i < len; i++) {
				if (createDebug.names[i].test(name)) {
					return true;
				}
			}

			return false;
		}

		/**
		* Convert regexp to namespace
		*
		* @param {RegExp} regxep
		* @return {String} namespace
		* @api private
		*/
		function toNamespace(regexp) {
			return regexp.toString()
				.substring(2, regexp.toString().length - 2)
				.replace(/\.\*\?$/, '*');
		}

		/**
		* Coerce `val`.
		*
		* @param {Mixed} val
		* @return {Mixed}
		* @api private
		*/
		function coerce(val) {
			if (val instanceof Error) {
				return val.stack || val.message;
			}
			return val;
		}

		/**
		* XXX DO NOT USE. This is a temporary stub function.
		* XXX It WILL be removed in the next major release.
		*/
		function destroy() {
			console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
		}

		createDebug.enable(createDebug.load());

		return createDebug;
	}

	var common = setup;

	(function (module, exports) {
		/**
		 * This is the web browser implementation of `debug()`.
		 */

		exports.formatArgs = formatArgs;
		exports.save = save;
		exports.load = load;
		exports.useColors = useColors;
		exports.storage = localstorage();
		exports.destroy = (() => {
			let warned = false;

			return () => {
				if (!warned) {
					warned = true;
					console.warn('Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.');
				}
			};
		})();

		/**
		 * Colors.
		 */

		exports.colors = [
			'#0000CC',
			'#0000FF',
			'#0033CC',
			'#0033FF',
			'#0066CC',
			'#0066FF',
			'#0099CC',
			'#0099FF',
			'#00CC00',
			'#00CC33',
			'#00CC66',
			'#00CC99',
			'#00CCCC',
			'#00CCFF',
			'#3300CC',
			'#3300FF',
			'#3333CC',
			'#3333FF',
			'#3366CC',
			'#3366FF',
			'#3399CC',
			'#3399FF',
			'#33CC00',
			'#33CC33',
			'#33CC66',
			'#33CC99',
			'#33CCCC',
			'#33CCFF',
			'#6600CC',
			'#6600FF',
			'#6633CC',
			'#6633FF',
			'#66CC00',
			'#66CC33',
			'#9900CC',
			'#9900FF',
			'#9933CC',
			'#9933FF',
			'#99CC00',
			'#99CC33',
			'#CC0000',
			'#CC0033',
			'#CC0066',
			'#CC0099',
			'#CC00CC',
			'#CC00FF',
			'#CC3300',
			'#CC3333',
			'#CC3366',
			'#CC3399',
			'#CC33CC',
			'#CC33FF',
			'#CC6600',
			'#CC6633',
			'#CC9900',
			'#CC9933',
			'#CCCC00',
			'#CCCC33',
			'#FF0000',
			'#FF0033',
			'#FF0066',
			'#FF0099',
			'#FF00CC',
			'#FF00FF',
			'#FF3300',
			'#FF3333',
			'#FF3366',
			'#FF3399',
			'#FF33CC',
			'#FF33FF',
			'#FF6600',
			'#FF6633',
			'#FF9900',
			'#FF9933',
			'#FFCC00',
			'#FFCC33'
		];

		/**
		 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
		 * and the Firebug extension (any Firefox version) are known
		 * to support "%c" CSS customizations.
		 *
		 * TODO: add a `localStorage` variable to explicitly enable/disable colors
		 */

		// eslint-disable-next-line complexity
		function useColors() {
			// NB: In an Electron preload script, document will be defined but not fully
			// initialized. Since we know we're in Chrome, we'll just detect this case
			// explicitly
			if (typeof window !== 'undefined' && window.process && (window.process.type === 'renderer' || window.process.__nwjs)) {
				return true;
			}

			// Internet Explorer and Edge do not support colors.
			if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
				return false;
			}

			// Is webkit? http://stackoverflow.com/a/16459606/376773
			// document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
			return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
				// Is firebug? http://stackoverflow.com/a/398120/376773
				(typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
				// Is firefox >= v31?
				// https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
				// Double check webkit in userAgent just in case we are in a worker
				(typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
		}

		/**
		 * Colorize log arguments if enabled.
		 *
		 * @api public
		 */

		function formatArgs(args) {
			args[0] = (this.useColors ? '%c' : '') +
				this.namespace +
				(this.useColors ? ' %c' : ' ') +
				args[0] +
				(this.useColors ? '%c ' : ' ') +
				'+' + module.exports.humanize(this.diff);

			if (!this.useColors) {
				return;
			}

			const c = 'color: ' + this.color;
			args.splice(1, 0, c, 'color: inherit');

			// The final "%c" is somewhat tricky, because there could be other
			// arguments passed either before or after the %c, so we need to
			// figure out the correct index to insert the CSS into
			let index = 0;
			let lastC = 0;
			args[0].replace(/%[a-zA-Z%]/g, match => {
				if (match === '%%') {
					return;
				}
				index++;
				if (match === '%c') {
					// We only are interested in the *last* %c
					// (the user may have provided their own)
					lastC = index;
				}
			});

			args.splice(lastC, 0, c);
		}

		/**
		 * Invokes `console.debug()` when available.
		 * No-op when `console.debug` is not a "function".
		 * If `console.debug` is not available, falls back
		 * to `console.log`.
		 *
		 * @api public
		 */
		exports.log = console.debug || console.log || (() => {});

		/**
		 * Save `namespaces`.
		 *
		 * @param {String} namespaces
		 * @api private
		 */
		function save(namespaces) {
			try {
				if (namespaces) {
					exports.storage.setItem('debug', namespaces);
				} else {
					exports.storage.removeItem('debug');
				}
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		/**
		 * Load `namespaces`.
		 *
		 * @return {String} returns the previously persisted debug modes
		 * @api private
		 */
		function load() {
			let r;
			try {
				r = exports.storage.getItem('debug');
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}

			// If debug isn't set in LS, and we're in Electron, try to load $DEBUG
			if (!r && typeof browser$1$1 !== 'undefined' && 'env' in browser$1$1) {
				r = browser$1$1.env.DEBUG;
			}

			return r;
		}

		/**
		 * Localstorage attempts to return the localstorage.
		 *
		 * This is necessary because safari throws
		 * when a user disables cookies/localstorage
		 * and you attempt to access it.
		 *
		 * @return {LocalStorage}
		 * @api private
		 */

		function localstorage() {
			try {
				// TVMLKit (Apple TV JS Runtime) does not have a window object, just localStorage in the global context
				// The Browser also has localStorage in the global context.
				return localStorage;
			} catch (error) {
				// Swallow
				// XXX (@Qix-) should we be logging these?
			}
		}

		module.exports = common(exports);

		const {formatters} = module.exports;

		/**
		 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
		 */

		formatters.j = function (v) {
			try {
				return JSON.stringify(v);
			} catch (error) {
				return '[UnexpectedJSONParseError]: ' + error.message;
			}
		}; 
	} (browser, browser.exports));

	var browserExports = browser.exports;
	var createDebug = /*@__PURE__*/getDefaultExportFromCjs(browserExports);

	var eventemitter3 = {exports: {}};

	(function (module) {

		var has = Object.prototype.hasOwnProperty
		  , prefix = '~';

		/**
		 * Constructor to create a storage for our `EE` objects.
		 * An `Events` instance is a plain object whose properties are event names.
		 *
		 * @constructor
		 * @private
		 */
		function Events() {}

		//
		// We try to not inherit from `Object.prototype`. In some engines creating an
		// instance in this way is faster than calling `Object.create(null)` directly.
		// If `Object.create(null)` is not supported we prefix the event names with a
		// character to make sure that the built-in object properties are not
		// overridden or used as an attack vector.
		//
		if (Object.create) {
		  Events.prototype = Object.create(null);

		  //
		  // This hack is needed because the `__proto__` property is still inherited in
		  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
		  //
		  if (!new Events().__proto__) prefix = false;
		}

		/**
		 * Representation of a single event listener.
		 *
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
		 * @constructor
		 * @private
		 */
		function EE(fn, context, once) {
		  this.fn = fn;
		  this.context = context;
		  this.once = once || false;
		}

		/**
		 * Add a listener for a given event.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} context The context to invoke the listener with.
		 * @param {Boolean} once Specify if the listener is a one-time listener.
		 * @returns {EventEmitter}
		 * @private
		 */
		function addListener(emitter, event, fn, context, once) {
		  if (typeof fn !== 'function') {
		    throw new TypeError('The listener must be a function');
		  }

		  var listener = new EE(fn, context || emitter, once)
		    , evt = prefix ? prefix + event : event;

		  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
		  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
		  else emitter._events[evt] = [emitter._events[evt], listener];

		  return emitter;
		}

		/**
		 * Clear event by name.
		 *
		 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
		 * @param {(String|Symbol)} evt The Event name.
		 * @private
		 */
		function clearEvent(emitter, evt) {
		  if (--emitter._eventsCount === 0) emitter._events = new Events();
		  else delete emitter._events[evt];
		}

		/**
		 * Minimal `EventEmitter` interface that is molded against the Node.js
		 * `EventEmitter` interface.
		 *
		 * @constructor
		 * @public
		 */
		function EventEmitter() {
		  this._events = new Events();
		  this._eventsCount = 0;
		}

		/**
		 * Return an array listing the events for which the emitter has registered
		 * listeners.
		 *
		 * @returns {Array}
		 * @public
		 */
		EventEmitter.prototype.eventNames = function eventNames() {
		  var names = []
		    , events
		    , name;

		  if (this._eventsCount === 0) return names;

		  for (name in (events = this._events)) {
		    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
		  }

		  if (Object.getOwnPropertySymbols) {
		    return names.concat(Object.getOwnPropertySymbols(events));
		  }

		  return names;
		};

		/**
		 * Return the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Array} The registered listeners.
		 * @public
		 */
		EventEmitter.prototype.listeners = function listeners(event) {
		  var evt = prefix ? prefix + event : event
		    , handlers = this._events[evt];

		  if (!handlers) return [];
		  if (handlers.fn) return [handlers.fn];

		  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
		    ee[i] = handlers[i].fn;
		  }

		  return ee;
		};

		/**
		 * Return the number of listeners listening to a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Number} The number of listeners.
		 * @public
		 */
		EventEmitter.prototype.listenerCount = function listenerCount(event) {
		  var evt = prefix ? prefix + event : event
		    , listeners = this._events[evt];

		  if (!listeners) return 0;
		  if (listeners.fn) return 1;
		  return listeners.length;
		};

		/**
		 * Calls each of the listeners registered for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @returns {Boolean} `true` if the event had listeners, else `false`.
		 * @public
		 */
		EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return false;

		  var listeners = this._events[evt]
		    , len = arguments.length
		    , args
		    , i;

		  if (listeners.fn) {
		    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

		    switch (len) {
		      case 1: return listeners.fn.call(listeners.context), true;
		      case 2: return listeners.fn.call(listeners.context, a1), true;
		      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
		      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
		      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
		      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
		    }

		    for (i = 1, args = new Array(len -1); i < len; i++) {
		      args[i - 1] = arguments[i];
		    }

		    listeners.fn.apply(listeners.context, args);
		  } else {
		    var length = listeners.length
		      , j;

		    for (i = 0; i < length; i++) {
		      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

		      switch (len) {
		        case 1: listeners[i].fn.call(listeners[i].context); break;
		        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
		        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
		        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
		        default:
		          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
		            args[j - 1] = arguments[j];
		          }

		          listeners[i].fn.apply(listeners[i].context, args);
		      }
		    }
		  }

		  return true;
		};

		/**
		 * Add a listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.on = function on(event, fn, context) {
		  return addListener(this, event, fn, context, false);
		};

		/**
		 * Add a one-time listener for a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn The listener function.
		 * @param {*} [context=this] The context to invoke the listener with.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.once = function once(event, fn, context) {
		  return addListener(this, event, fn, context, true);
		};

		/**
		 * Remove the listeners of a given event.
		 *
		 * @param {(String|Symbol)} event The event name.
		 * @param {Function} fn Only remove the listeners that match this function.
		 * @param {*} context Only remove the listeners that have this context.
		 * @param {Boolean} once Only remove one-time listeners.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
		  var evt = prefix ? prefix + event : event;

		  if (!this._events[evt]) return this;
		  if (!fn) {
		    clearEvent(this, evt);
		    return this;
		  }

		  var listeners = this._events[evt];

		  if (listeners.fn) {
		    if (
		      listeners.fn === fn &&
		      (!once || listeners.once) &&
		      (!context || listeners.context === context)
		    ) {
		      clearEvent(this, evt);
		    }
		  } else {
		    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
		      if (
		        listeners[i].fn !== fn ||
		        (once && !listeners[i].once) ||
		        (context && listeners[i].context !== context)
		      ) {
		        events.push(listeners[i]);
		      }
		    }

		    //
		    // Reset the array, or remove it completely if we have no more listeners.
		    //
		    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
		    else clearEvent(this, evt);
		  }

		  return this;
		};

		/**
		 * Remove all listeners, or those of the specified event.
		 *
		 * @param {(String|Symbol)} [event] The event name.
		 * @returns {EventEmitter} `this`.
		 * @public
		 */
		EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
		  var evt;

		  if (event) {
		    evt = prefix ? prefix + event : event;
		    if (this._events[evt]) clearEvent(this, evt);
		  } else {
		    this._events = new Events();
		    this._eventsCount = 0;
		  }

		  return this;
		};

		//
		// Alias methods names because people roll like that.
		//
		EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
		EventEmitter.prototype.addListener = EventEmitter.prototype.on;

		//
		// Expose the prefix.
		//
		EventEmitter.prefixed = prefix;

		//
		// Allow `EventEmitter` to be imported as module namespace.
		//
		EventEmitter.EventEmitter = EventEmitter;

		//
		// Expose the module.
		//
		{
		  module.exports = EventEmitter;
		} 
	} (eventemitter3));

	var eventemitter3Exports = eventemitter3.exports;
	var EventEmitter = /*@__PURE__*/getDefaultExportFromCjs(eventemitter3Exports);

	// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

	var ws = null;

	if (typeof WebSocket !== 'undefined') {
	  ws = WebSocket;
	} else if (typeof MozWebSocket !== 'undefined') {
	  ws = MozWebSocket;
	} else if (typeof global$1 !== 'undefined') {
	  ws = global$1.WebSocket || global$1.MozWebSocket;
	} else if (typeof window !== 'undefined') {
	  ws = window.WebSocket || window.MozWebSocket;
	} else if (typeof self !== 'undefined') {
	  ws = self.WebSocket || self.MozWebSocket;
	}

	var WebSocketIpml = ws;

	var sha256$1 = {exports: {}};

	function commonjsRequire(path) {
		throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
	}

	var core = {exports: {}};

	var _polyfillNode_crypto = {};

	var _polyfillNode_crypto$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		default: _polyfillNode_crypto
	});

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(_polyfillNode_crypto$1);

	var hasRequiredCore;

	function requireCore () {
		if (hasRequiredCore) return core.exports;
		hasRequiredCore = 1;
		(function (module, exports) {
	(function (root, factory) {
				{
					// CommonJS
					module.exports = factory();
				}
			}(commonjsGlobal, function () {

				/*globals window, global, require*/

				/**
				 * CryptoJS core components.
				 */
				var CryptoJS = CryptoJS || (function (Math, undefined$1) {

				    var crypto;

				    // Native crypto from window (Browser)
				    if (typeof window !== 'undefined' && window.crypto) {
				        crypto = window.crypto;
				    }

				    // Native crypto in web worker (Browser)
				    if (typeof self !== 'undefined' && self.crypto) {
				        crypto = self.crypto;
				    }

				    // Native crypto from worker
				    if (typeof globalThis !== 'undefined' && globalThis.crypto) {
				        crypto = globalThis.crypto;
				    }

				    // Native (experimental IE 11) crypto from window (Browser)
				    if (!crypto && typeof window !== 'undefined' && window.msCrypto) {
				        crypto = window.msCrypto;
				    }

				    // Native crypto from global (NodeJS)
				    if (!crypto && typeof commonjsGlobal !== 'undefined' && commonjsGlobal.crypto) {
				        crypto = commonjsGlobal.crypto;
				    }

				    // Native crypto import via require (NodeJS)
				    if (!crypto && typeof commonjsRequire === 'function') {
				        try {
				            crypto = require$$0;
				        } catch (err) {}
				    }

				    /*
				     * Cryptographically secure pseudorandom number generator
				     *
				     * As Math.random() is cryptographically not safe to use
				     */
				    var cryptoSecureRandomInt = function () {
				        if (crypto) {
				            // Use getRandomValues method (Browser)
				            if (typeof crypto.getRandomValues === 'function') {
				                try {
				                    return crypto.getRandomValues(new Uint32Array(1))[0];
				                } catch (err) {}
				            }

				            // Use randomBytes method (NodeJS)
				            if (typeof crypto.randomBytes === 'function') {
				                try {
				                    return crypto.randomBytes(4).readInt32LE();
				                } catch (err) {}
				            }
				        }

				        throw new Error('Native crypto module could not be used to get secure random number.');
				    };

				    /*
				     * Local polyfill of Object.create

				     */
				    var create = Object.create || (function () {
				        function F() {}

				        return function (obj) {
				            var subtype;

				            F.prototype = obj;

				            subtype = new F();

				            F.prototype = null;

				            return subtype;
				        };
				    }());

				    /**
				     * CryptoJS namespace.
				     */
				    var C = {};

				    /**
				     * Library namespace.
				     */
				    var C_lib = C.lib = {};

				    /**
				     * Base object for prototypal inheritance.
				     */
				    var Base = C_lib.Base = (function () {


				        return {
				            /**
				             * Creates a new object that inherits from this object.
				             *
				             * @param {Object} overrides Properties to copy into the new object.
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         field: 'value',
				             *
				             *         method: function () {
				             *         }
				             *     });
				             */
				            extend: function (overrides) {
				                // Spawn
				                var subtype = create(this);

				                // Augment
				                if (overrides) {
				                    subtype.mixIn(overrides);
				                }

				                // Create default initializer
				                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
				                    subtype.init = function () {
				                        subtype.$super.init.apply(this, arguments);
				                    };
				                }

				                // Initializer's prototype is the subtype object
				                subtype.init.prototype = subtype;

				                // Reference supertype
				                subtype.$super = this;

				                return subtype;
				            },

				            /**
				             * Extends this object and runs the init method.
				             * Arguments to create() will be passed to init().
				             *
				             * @return {Object} The new object.
				             *
				             * @static
				             *
				             * @example
				             *
				             *     var instance = MyType.create();
				             */
				            create: function () {
				                var instance = this.extend();
				                instance.init.apply(instance, arguments);

				                return instance;
				            },

				            /**
				             * Initializes a newly created object.
				             * Override this method to add some logic when your objects are created.
				             *
				             * @example
				             *
				             *     var MyType = CryptoJS.lib.Base.extend({
				             *         init: function () {
				             *             // ...
				             *         }
				             *     });
				             */
				            init: function () {
				            },

				            /**
				             * Copies properties into this object.
				             *
				             * @param {Object} properties The properties to mix in.
				             *
				             * @example
				             *
				             *     MyType.mixIn({
				             *         field: 'value'
				             *     });
				             */
				            mixIn: function (properties) {
				                for (var propertyName in properties) {
				                    if (properties.hasOwnProperty(propertyName)) {
				                        this[propertyName] = properties[propertyName];
				                    }
				                }

				                // IE won't copy toString using the loop above
				                if (properties.hasOwnProperty('toString')) {
				                    this.toString = properties.toString;
				                }
				            },

				            /**
				             * Creates a copy of this object.
				             *
				             * @return {Object} The clone.
				             *
				             * @example
				             *
				             *     var clone = instance.clone();
				             */
				            clone: function () {
				                return this.init.prototype.extend(this);
				            }
				        };
				    }());

				    /**
				     * An array of 32-bit words.
				     *
				     * @property {Array} words The array of 32-bit words.
				     * @property {number} sigBytes The number of significant bytes in this word array.
				     */
				    var WordArray = C_lib.WordArray = Base.extend({
				        /**
				         * Initializes a newly created word array.
				         *
				         * @param {Array} words (Optional) An array of 32-bit words.
				         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.create();
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
				         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
				         */
				        init: function (words, sigBytes) {
				            words = this.words = words || [];

				            if (sigBytes != undefined$1) {
				                this.sigBytes = sigBytes;
				            } else {
				                this.sigBytes = words.length * 4;
				            }
				        },

				        /**
				         * Converts this word array to a string.
				         *
				         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
				         *
				         * @return {string} The stringified word array.
				         *
				         * @example
				         *
				         *     var string = wordArray + '';
				         *     var string = wordArray.toString();
				         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
				         */
				        toString: function (encoder) {
				            return (encoder || Hex).stringify(this);
				        },

				        /**
				         * Concatenates a word array to this word array.
				         *
				         * @param {WordArray} wordArray The word array to append.
				         *
				         * @return {WordArray} This word array.
				         *
				         * @example
				         *
				         *     wordArray1.concat(wordArray2);
				         */
				        concat: function (wordArray) {
				            // Shortcuts
				            var thisWords = this.words;
				            var thatWords = wordArray.words;
				            var thisSigBytes = this.sigBytes;
				            var thatSigBytes = wordArray.sigBytes;

				            // Clamp excess bits
				            this.clamp();

				            // Concat
				            if (thisSigBytes % 4) {
				                // Copy one byte at a time
				                for (var i = 0; i < thatSigBytes; i++) {
				                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
				                }
				            } else {
				                // Copy one word at a time
				                for (var j = 0; j < thatSigBytes; j += 4) {
				                    thisWords[(thisSigBytes + j) >>> 2] = thatWords[j >>> 2];
				                }
				            }
				            this.sigBytes += thatSigBytes;

				            // Chainable
				            return this;
				        },

				        /**
				         * Removes insignificant bits.
				         *
				         * @example
				         *
				         *     wordArray.clamp();
				         */
				        clamp: function () {
				            // Shortcuts
				            var words = this.words;
				            var sigBytes = this.sigBytes;

				            // Clamp
				            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
				            words.length = Math.ceil(sigBytes / 4);
				        },

				        /**
				         * Creates a copy of this word array.
				         *
				         * @return {WordArray} The clone.
				         *
				         * @example
				         *
				         *     var clone = wordArray.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone.words = this.words.slice(0);

				            return clone;
				        },

				        /**
				         * Creates a word array filled with random bytes.
				         *
				         * @param {number} nBytes The number of random bytes to generate.
				         *
				         * @return {WordArray} The random word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.lib.WordArray.random(16);
				         */
				        random: function (nBytes) {
				            var words = [];

				            for (var i = 0; i < nBytes; i += 4) {
				                words.push(cryptoSecureRandomInt());
				            }

				            return new WordArray.init(words, nBytes);
				        }
				    });

				    /**
				     * Encoder namespace.
				     */
				    var C_enc = C.enc = {};

				    /**
				     * Hex encoding strategy.
				     */
				    var Hex = C_enc.Hex = {
				        /**
				         * Converts a word array to a hex string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The hex string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var hexChars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                hexChars.push((bite >>> 4).toString(16));
				                hexChars.push((bite & 0x0f).toString(16));
				            }

				            return hexChars.join('');
				        },

				        /**
				         * Converts a hex string to a word array.
				         *
				         * @param {string} hexStr The hex string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
				         */
				        parse: function (hexStr) {
				            // Shortcut
				            var hexStrLength = hexStr.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < hexStrLength; i += 2) {
				                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
				            }

				            return new WordArray.init(words, hexStrLength / 2);
				        }
				    };

				    /**
				     * Latin1 encoding strategy.
				     */
				    var Latin1 = C_enc.Latin1 = {
				        /**
				         * Converts a word array to a Latin1 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The Latin1 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            // Shortcuts
				            var words = wordArray.words;
				            var sigBytes = wordArray.sigBytes;

				            // Convert
				            var latin1Chars = [];
				            for (var i = 0; i < sigBytes; i++) {
				                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
				                latin1Chars.push(String.fromCharCode(bite));
				            }

				            return latin1Chars.join('');
				        },

				        /**
				         * Converts a Latin1 string to a word array.
				         *
				         * @param {string} latin1Str The Latin1 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
				         */
				        parse: function (latin1Str) {
				            // Shortcut
				            var latin1StrLength = latin1Str.length;

				            // Convert
				            var words = [];
				            for (var i = 0; i < latin1StrLength; i++) {
				                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
				            }

				            return new WordArray.init(words, latin1StrLength);
				        }
				    };

				    /**
				     * UTF-8 encoding strategy.
				     */
				    var Utf8 = C_enc.Utf8 = {
				        /**
				         * Converts a word array to a UTF-8 string.
				         *
				         * @param {WordArray} wordArray The word array.
				         *
				         * @return {string} The UTF-8 string.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
				         */
				        stringify: function (wordArray) {
				            try {
				                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
				            } catch (e) {
				                throw new Error('Malformed UTF-8 data');
				            }
				        },

				        /**
				         * Converts a UTF-8 string to a word array.
				         *
				         * @param {string} utf8Str The UTF-8 string.
				         *
				         * @return {WordArray} The word array.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
				         */
				        parse: function (utf8Str) {
				            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
				        }
				    };

				    /**
				     * Abstract buffered block algorithm template.
				     *
				     * The property blockSize must be implemented in a concrete subtype.
				     *
				     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
				     */
				    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
				        /**
				         * Resets this block algorithm's data buffer to its initial state.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm.reset();
				         */
				        reset: function () {
				            // Initial values
				            this._data = new WordArray.init();
				            this._nDataBytes = 0;
				        },

				        /**
				         * Adds new data to this block algorithm's buffer.
				         *
				         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
				         *
				         * @example
				         *
				         *     bufferedBlockAlgorithm._append('data');
				         *     bufferedBlockAlgorithm._append(wordArray);
				         */
				        _append: function (data) {
				            // Convert string to WordArray, else assume WordArray already
				            if (typeof data == 'string') {
				                data = Utf8.parse(data);
				            }

				            // Append
				            this._data.concat(data);
				            this._nDataBytes += data.sigBytes;
				        },

				        /**
				         * Processes available data blocks.
				         *
				         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
				         *
				         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
				         *
				         * @return {WordArray} The processed data.
				         *
				         * @example
				         *
				         *     var processedData = bufferedBlockAlgorithm._process();
				         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
				         */
				        _process: function (doFlush) {
				            var processedWords;

				            // Shortcuts
				            var data = this._data;
				            var dataWords = data.words;
				            var dataSigBytes = data.sigBytes;
				            var blockSize = this.blockSize;
				            var blockSizeBytes = blockSize * 4;

				            // Count blocks ready
				            var nBlocksReady = dataSigBytes / blockSizeBytes;
				            if (doFlush) {
				                // Round up to include partial blocks
				                nBlocksReady = Math.ceil(nBlocksReady);
				            } else {
				                // Round down to include only full blocks,
				                // less the number of blocks that must remain in the buffer
				                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
				            }

				            // Count words ready
				            var nWordsReady = nBlocksReady * blockSize;

				            // Count bytes ready
				            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

				            // Process blocks
				            if (nWordsReady) {
				                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
				                    // Perform concrete-algorithm logic
				                    this._doProcessBlock(dataWords, offset);
				                }

				                // Remove processed words
				                processedWords = dataWords.splice(0, nWordsReady);
				                data.sigBytes -= nBytesReady;
				            }

				            // Return processed words
				            return new WordArray.init(processedWords, nBytesReady);
				        },

				        /**
				         * Creates a copy of this object.
				         *
				         * @return {Object} The clone.
				         *
				         * @example
				         *
				         *     var clone = bufferedBlockAlgorithm.clone();
				         */
				        clone: function () {
				            var clone = Base.clone.call(this);
				            clone._data = this._data.clone();

				            return clone;
				        },

				        _minBufferSize: 0
				    });

				    /**
				     * Abstract hasher template.
				     *
				     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
				     */
				    C_lib.Hasher = BufferedBlockAlgorithm.extend({
				        /**
				         * Configuration options.
				         */
				        cfg: Base.extend(),

				        /**
				         * Initializes a newly created hasher.
				         *
				         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
				         *
				         * @example
				         *
				         *     var hasher = CryptoJS.algo.SHA256.create();
				         */
				        init: function (cfg) {
				            // Apply config defaults
				            this.cfg = this.cfg.extend(cfg);

				            // Set initial values
				            this.reset();
				        },

				        /**
				         * Resets this hasher to its initial state.
				         *
				         * @example
				         *
				         *     hasher.reset();
				         */
				        reset: function () {
				            // Reset data buffer
				            BufferedBlockAlgorithm.reset.call(this);

				            // Perform concrete-hasher logic
				            this._doReset();
				        },

				        /**
				         * Updates this hasher with a message.
				         *
				         * @param {WordArray|string} messageUpdate The message to append.
				         *
				         * @return {Hasher} This hasher.
				         *
				         * @example
				         *
				         *     hasher.update('message');
				         *     hasher.update(wordArray);
				         */
				        update: function (messageUpdate) {
				            // Append
				            this._append(messageUpdate);

				            // Update the hash
				            this._process();

				            // Chainable
				            return this;
				        },

				        /**
				         * Finalizes the hash computation.
				         * Note that the finalize operation is effectively a destructive, read-once operation.
				         *
				         * @param {WordArray|string} messageUpdate (Optional) A final message update.
				         *
				         * @return {WordArray} The hash.
				         *
				         * @example
				         *
				         *     var hash = hasher.finalize();
				         *     var hash = hasher.finalize('message');
				         *     var hash = hasher.finalize(wordArray);
				         */
				        finalize: function (messageUpdate) {
				            // Final message update
				            if (messageUpdate) {
				                this._append(messageUpdate);
				            }

				            // Perform concrete-hasher logic
				            var hash = this._doFinalize();

				            return hash;
				        },

				        blockSize: 512/32,

				        /**
				         * Creates a shortcut function to a hasher's object interface.
				         *
				         * @param {Hasher} hasher The hasher to create a helper for.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
				         */
				        _createHelper: function (hasher) {
				            return function (message, cfg) {
				                return new hasher.init(cfg).finalize(message);
				            };
				        },

				        /**
				         * Creates a shortcut function to the HMAC's object interface.
				         *
				         * @param {Hasher} hasher The hasher to use in this HMAC helper.
				         *
				         * @return {Function} The shortcut function.
				         *
				         * @static
				         *
				         * @example
				         *
				         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
				         */
				        _createHmacHelper: function (hasher) {
				            return function (message, key) {
				                return new C_algo.HMAC.init(hasher, key).finalize(message);
				            };
				        }
				    });

				    /**
				     * Algorithm namespace.
				     */
				    var C_algo = C.algo = {};

				    return C;
				}(Math));


				return CryptoJS;

			})); 
		} (core));
		return core.exports;
	}

	(function (module, exports) {
	(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(commonjsGlobal, function (CryptoJS) {

			(function (Math) {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var Hasher = C_lib.Hasher;
			    var C_algo = C.algo;

			    // Initialization and round constants tables
			    var H = [];
			    var K = [];

			    // Compute constants
			    (function () {
			        function isPrime(n) {
			            var sqrtN = Math.sqrt(n);
			            for (var factor = 2; factor <= sqrtN; factor++) {
			                if (!(n % factor)) {
			                    return false;
			                }
			            }

			            return true;
			        }

			        function getFractionalBits(n) {
			            return ((n - (n | 0)) * 0x100000000) | 0;
			        }

			        var n = 2;
			        var nPrime = 0;
			        while (nPrime < 64) {
			            if (isPrime(n)) {
			                if (nPrime < 8) {
			                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
			                }
			                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

			                nPrime++;
			            }

			            n++;
			        }
			    }());

			    // Reusable object
			    var W = [];

			    /**
			     * SHA-256 hash algorithm.
			     */
			    var SHA256 = C_algo.SHA256 = Hasher.extend({
			        _doReset: function () {
			            this._hash = new WordArray.init(H.slice(0));
			        },

			        _doProcessBlock: function (M, offset) {
			            // Shortcut
			            var H = this._hash.words;

			            // Working variables
			            var a = H[0];
			            var b = H[1];
			            var c = H[2];
			            var d = H[3];
			            var e = H[4];
			            var f = H[5];
			            var g = H[6];
			            var h = H[7];

			            // Computation
			            for (var i = 0; i < 64; i++) {
			                if (i < 16) {
			                    W[i] = M[offset + i] | 0;
			                } else {
			                    var gamma0x = W[i - 15];
			                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
			                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
			                                   (gamma0x >>> 3);

			                    var gamma1x = W[i - 2];
			                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
			                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
			                                   (gamma1x >>> 10);

			                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
			                }

			                var ch  = (e & f) ^ (~e & g);
			                var maj = (a & b) ^ (a & c) ^ (b & c);

			                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
			                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

			                var t1 = h + sigma1 + ch + K[i] + W[i];
			                var t2 = sigma0 + maj;

			                h = g;
			                g = f;
			                f = e;
			                e = (d + t1) | 0;
			                d = c;
			                c = b;
			                b = a;
			                a = (t1 + t2) | 0;
			            }

			            // Intermediate hash value
			            H[0] = (H[0] + a) | 0;
			            H[1] = (H[1] + b) | 0;
			            H[2] = (H[2] + c) | 0;
			            H[3] = (H[3] + d) | 0;
			            H[4] = (H[4] + e) | 0;
			            H[5] = (H[5] + f) | 0;
			            H[6] = (H[6] + g) | 0;
			            H[7] = (H[7] + h) | 0;
			        },

			        _doFinalize: function () {
			            // Shortcuts
			            var data = this._data;
			            var dataWords = data.words;

			            var nBitsTotal = this._nDataBytes * 8;
			            var nBitsLeft = data.sigBytes * 8;

			            // Add padding
			            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
			            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
			            data.sigBytes = dataWords.length * 4;

			            // Hash final blocks
			            this._process();

			            // Return final computed hash
			            return this._hash;
			        },

			        clone: function () {
			            var clone = Hasher.clone.call(this);
			            clone._hash = this._hash.clone();

			            return clone;
			        }
			    });

			    /**
			     * Shortcut function to the hasher's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     *
			     * @return {WordArray} The hash.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hash = CryptoJS.SHA256('message');
			     *     var hash = CryptoJS.SHA256(wordArray);
			     */
			    C.SHA256 = Hasher._createHelper(SHA256);

			    /**
			     * Shortcut function to the HMAC's object interface.
			     *
			     * @param {WordArray|string} message The message to hash.
			     * @param {WordArray|string} key The secret key.
			     *
			     * @return {WordArray} The HMAC.
			     *
			     * @static
			     *
			     * @example
			     *
			     *     var hmac = CryptoJS.HmacSHA256(message, key);
			     */
			    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
			}(Math));


			return CryptoJS.SHA256;

		})); 
	} (sha256$1));

	var sha256Exports = sha256$1.exports;
	var sha256 = /*@__PURE__*/getDefaultExportFromCjs(sha256Exports);

	var encBase64 = {exports: {}};

	(function (module, exports) {
	(function (root, factory) {
			{
				// CommonJS
				module.exports = factory(requireCore());
			}
		}(commonjsGlobal, function (CryptoJS) {

			(function () {
			    // Shortcuts
			    var C = CryptoJS;
			    var C_lib = C.lib;
			    var WordArray = C_lib.WordArray;
			    var C_enc = C.enc;

			    /**
			     * Base64 encoding strategy.
			     */
			    C_enc.Base64 = {
			        /**
			         * Converts a word array to a Base64 string.
			         *
			         * @param {WordArray} wordArray The word array.
			         *
			         * @return {string} The Base64 string.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
			         */
			        stringify: function (wordArray) {
			            // Shortcuts
			            var words = wordArray.words;
			            var sigBytes = wordArray.sigBytes;
			            var map = this._map;

			            // Clamp excess bits
			            wordArray.clamp();

			            // Convert
			            var base64Chars = [];
			            for (var i = 0; i < sigBytes; i += 3) {
			                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
			                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
			                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

			                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

			                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
			                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
			                }
			            }

			            // Add padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                while (base64Chars.length % 4) {
			                    base64Chars.push(paddingChar);
			                }
			            }

			            return base64Chars.join('');
			        },

			        /**
			         * Converts a Base64 string to a word array.
			         *
			         * @param {string} base64Str The Base64 string.
			         *
			         * @return {WordArray} The word array.
			         *
			         * @static
			         *
			         * @example
			         *
			         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
			         */
			        parse: function (base64Str) {
			            // Shortcuts
			            var base64StrLength = base64Str.length;
			            var map = this._map;
			            var reverseMap = this._reverseMap;

			            if (!reverseMap) {
			                    reverseMap = this._reverseMap = [];
			                    for (var j = 0; j < map.length; j++) {
			                        reverseMap[map.charCodeAt(j)] = j;
			                    }
			            }

			            // Ignore padding
			            var paddingChar = map.charAt(64);
			            if (paddingChar) {
			                var paddingIndex = base64Str.indexOf(paddingChar);
			                if (paddingIndex !== -1) {
			                    base64StrLength = paddingIndex;
			                }
			            }

			            // Convert
			            return parseLoop(base64Str, base64StrLength, reverseMap);

			        },

			        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
			    };

			    function parseLoop(base64Str, base64StrLength, reverseMap) {
			      var words = [];
			      var nBytes = 0;
			      for (var i = 0; i < base64StrLength; i++) {
			          if (i % 4) {
			              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
			              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
			              var bitsCombined = bits1 | bits2;
			              words[nBytes >>> 2] |= bitsCombined << (24 - (nBytes % 4) * 8);
			              nBytes++;
			          }
			      }
			      return WordArray.create(words, nBytes);
			    }
			}());


			return CryptoJS.enc.Base64;

		})); 
	} (encBase64));

	var encBase64Exports = encBase64.exports;
	var Base64 = /*@__PURE__*/getDefaultExportFromCjs(encBase64Exports);

	function _extends() {
	  _extends = Object.assign ? Object.assign.bind() : function (target) {
	    for (var i = 1; i < arguments.length; i++) {
	      var source = arguments[i];
	      for (var key in source) {
	        if (Object.prototype.hasOwnProperty.call(source, key)) {
	          target[key] = source[key];
	        }
	      }
	    }
	    return target;
	  };
	  return _extends.apply(this, arguments);
	}
	function _objectWithoutPropertiesLoose(source, excluded) {
	  if (source == null) return {};
	  var target = {};
	  var sourceKeys = Object.keys(source);
	  var key, i;
	  for (i = 0; i < sourceKeys.length; i++) {
	    key = sourceKeys[i];
	    if (excluded.indexOf(key) >= 0) continue;
	    target[key] = source[key];
	  }
	  return target;
	}

	var WebSocketOpCode;
	(function (WebSocketOpCode) {
	  /**
	   * The initial message sent by obs-websocket to newly connected clients.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Hello"] = 0] = "Hello";
	  /**
	   * The message sent by a newly connected client to obs-websocket in response to a `Hello`.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Identify"] = 1] = "Identify";
	  /**
	   * The response sent by obs-websocket to a client after it has successfully identified with obs-websocket.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Identified"] = 2] = "Identified";
	  /**
	   * The message sent by an already-identified client to update identification parameters.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Reidentify"] = 3] = "Reidentify";
	  /**
	   * The message sent by obs-websocket containing an event payload.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Event"] = 5] = "Event";
	  /**
	   * The message sent by a client to obs-websocket to perform a request.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["Request"] = 6] = "Request";
	  /**
	   * The message sent by obs-websocket in response to a particular request from a client.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["RequestResponse"] = 7] = "RequestResponse";
	  /**
	   * The message sent by a client to obs-websocket to perform a batch of requests.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["RequestBatch"] = 8] = "RequestBatch";
	  /**
	   * The message sent by obs-websocket in response to a particular batch of requests from a client.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  WebSocketOpCode[WebSocketOpCode["RequestBatchResponse"] = 9] = "RequestBatchResponse";
	})(WebSocketOpCode || (WebSocketOpCode = {}));
	/* eslint-disable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
	var EventSubscription;
	(function (EventSubscription) {
	  /**
	   * Subcription value used to disable all events.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["None"] = 0] = "None";
	  /**
	   * Subscription value to receive events in the `General` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["General"] = 1] = "General";
	  /**
	   * Subscription value to receive events in the `Config` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Config"] = 2] = "Config";
	  /**
	   * Subscription value to receive events in the `Scenes` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Scenes"] = 4] = "Scenes";
	  /**
	   * Subscription value to receive events in the `Inputs` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Inputs"] = 8] = "Inputs";
	  /**
	   * Subscription value to receive events in the `Transitions` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Transitions"] = 16] = "Transitions";
	  /**
	   * Subscription value to receive events in the `Filters` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Filters"] = 32] = "Filters";
	  /**
	   * Subscription value to receive events in the `Outputs` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Outputs"] = 64] = "Outputs";
	  /**
	   * Subscription value to receive events in the `SceneItems` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["SceneItems"] = 128] = "SceneItems";
	  /**
	   * Subscription value to receive events in the `MediaInputs` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["MediaInputs"] = 256] = "MediaInputs";
	  /**
	   * Subscription value to receive the `VendorEvent` event.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Vendors"] = 512] = "Vendors";
	  /**
	   * Subscription value to receive events in the `Ui` category.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["Ui"] = 1024] = "Ui";
	  /**
	   * Helper to receive all non-high-volume events.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["All"] = 2047] = "All";
	  /**
	   * Subscription value to receive the `InputVolumeMeters` high-volume event.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["InputVolumeMeters"] = 65536] = "InputVolumeMeters";
	  /**
	   * Subscription value to receive the `InputActiveStateChanged` high-volume event.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["InputActiveStateChanged"] = 131072] = "InputActiveStateChanged";
	  /**
	   * Subscription value to receive the `InputShowStateChanged` high-volume event.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["InputShowStateChanged"] = 262144] = "InputShowStateChanged";
	  /**
	   * Subscription value to receive the `SceneItemTransformChanged` high-volume event.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  EventSubscription[EventSubscription["SceneItemTransformChanged"] = 524288] = "SceneItemTransformChanged";
	})(EventSubscription || (EventSubscription = {}));
	/* eslint-enable no-bitwise, @typescript-eslint/prefer-literal-enum-member */
	var RequestBatchExecutionType;
	(function (RequestBatchExecutionType) {
	  /**
	   * Not a request batch.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  RequestBatchExecutionType[RequestBatchExecutionType["None"] = -1] = "None";
	  /**
	   * A request batch which processes all requests serially, as fast as possible.
	   *
	   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepMillis` request field.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  RequestBatchExecutionType[RequestBatchExecutionType["SerialRealtime"] = 0] = "SerialRealtime";
	  /**
	   * A request batch type which processes all requests serially, in sync with the graphics thread. Designed to provide high accuracy for animations.
	   *
	   * Note: To introduce artificial delay, use the `Sleep` request and the `sleepFrames` request field.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  RequestBatchExecutionType[RequestBatchExecutionType["SerialFrame"] = 1] = "SerialFrame";
	  /**
	   * A request batch type which processes all requests using all available threads in the thread pool.
	   *
	   * Note: This is mainly experimental, and only really shows its colors during requests which require lots of
	   * active processing, like `GetSourceScreenshot`.
	   *
	   * Initial OBS Version: 5.0.0
	   */
	  RequestBatchExecutionType[RequestBatchExecutionType["Parallel"] = 2] = "Parallel";
	})(RequestBatchExecutionType || (RequestBatchExecutionType = {}));

	/**
	 * SHA256 Hashing.
	 * @param  {string} [salt=''] salt.
	 * @param  {string} [challenge=''] challenge.
	 * @param  {string} msg Message to encode.
	 * @returns {string} sha256 encoded string.
	 */
	function authenticationHashing (salt, challenge, msg) {
	  const hash = Base64.stringify(sha256(msg + salt));
	  return Base64.stringify(sha256(hash + challenge));
	}

	const _excluded = ["authentication", "rpcVersion"];
	const debug = createDebug('obs-websocket-js');
	class OBSWebSocketError extends Error {
	  constructor(code, message) {
	    super(message);
	    this.code = void 0;
	    this.code = code;
	  }
	}
	class BaseOBSWebSocket extends EventEmitter {
	  constructor(...args) {
	    super(...args);
	    this._identified = false;
	    this.internalListeners = new EventEmitter();
	    this.socket = void 0;
	  }
	  static generateMessageId() {
	    return String(BaseOBSWebSocket.requestCounter++);
	  }
	  get identified() {
	    return this._identified;
	  }
	  /**
	   * Connect to an obs-websocket server
	   * @param url Websocket server to connect to (including ws:// or wss:// protocol)
	   * @param password Password
	   * @param identificationParams Data for Identify event
	   * @returns Hello & Identified messages data (combined)
	   */
	  async connect(url = 'ws://127.0.0.1:4455', password, identificationParams = {}) {
	    var _this = this;
	    if (this.socket) {
	      await this.disconnect();
	    }
	    try {
	      const connectionClosedPromise = this.internalEventPromise('ConnectionClosed');
	      const connectionErrorPromise = this.internalEventPromise('ConnectionError');
	      return await Promise.race([async function () {
	        const hello = await _this.createConnection(url);
	        _this.emit('Hello', hello);
	        return _this.identify(hello, password, identificationParams);
	      }(),
	      // Choose the best promise for connection error/close
	      // In browser connection close has close code + reason,
	      // while in node error event has these
	      new Promise((resolve, reject) => {
	        void connectionErrorPromise.then(e => {
	          if (e.message) {
	            reject(e);
	          }
	        });
	        void connectionClosedPromise.then(e => {
	          reject(e);
	        });
	      })]);
	    } catch (error) {
	      await this.disconnect();
	      throw error;
	    }
	  }
	  /**
	   * Disconnect from obs-websocket server
	   */
	  async disconnect() {
	    if (!this.socket || this.socket.readyState === WebSocketIpml.CLOSED) {
	      return;
	    }
	    const connectionClosedPromise = this.internalEventPromise('ConnectionClosed');
	    this.socket.close();
	    await connectionClosedPromise;
	  }
	  /**
	   * Update session parameters
	   * @param data Reidentify data
	   * @returns Identified message data
	   */
	  async reidentify(data) {
	    const identifiedPromise = this.internalEventPromise(`op:${WebSocketOpCode.Identified}`);
	    await this.message(WebSocketOpCode.Reidentify, data);
	    return identifiedPromise;
	  }
	  /**
	   * Send a request to obs-websocket
	   * @param requestType Request name
	   * @param requestData Request data
	   * @returns Request response
	   */
	  async call(requestType, requestData) {
	    const requestId = BaseOBSWebSocket.generateMessageId();
	    const responsePromise = this.internalEventPromise(`res:${requestId}`);
	    await this.message(WebSocketOpCode.Request, {
	      requestId,
	      requestType,
	      requestData
	    });
	    const {
	      requestStatus,
	      responseData
	    } = await responsePromise;
	    if (!requestStatus.result) {
	      throw new OBSWebSocketError(requestStatus.code, requestStatus.comment);
	    }
	    return responseData;
	  }
	  /**
	   * Send a batch request to obs-websocket
	   * @param requests Array of Request objects (type and data)
	   * @param options A set of options for how the batch will be executed
	   * @param options.executionType The mode of execution obs-websocket will run the batch in
	   * @param options.haltOnFailure Whether obs-websocket should stop executing the batch if one request fails
	   * @returns RequestBatch response
	   */
	  async callBatch(requests, options = {}) {
	    const requestId = BaseOBSWebSocket.generateMessageId();
	    const responsePromise = this.internalEventPromise(`res:${requestId}`);
	    await this.message(WebSocketOpCode.RequestBatch, _extends({
	      requestId,
	      requests
	    }, options));
	    const {
	      results
	    } = await responsePromise;
	    return results;
	  }
	  /**
	   * Cleanup from socket disconnection
	   */
	  cleanup() {
	    if (!this.socket) {
	      return;
	    }
	    this.socket.onopen = null;
	    this.socket.onmessage = null;
	    this.socket.onerror = null;
	    this.socket.onclose = null;
	    this.socket = undefined;
	    this._identified = false;
	    // Cleanup leftovers
	    this.internalListeners.removeAllListeners();
	  }
	  /**
	   * Create connection to specified obs-websocket server
	   *
	   * @private
	   * @param url Websocket address
	   * @returns Promise for hello data
	   */
	  async createConnection(url) {
	    var _this$socket;
	    const connectionOpenedPromise = this.internalEventPromise('ConnectionOpened');
	    const helloPromise = this.internalEventPromise(`op:${WebSocketOpCode.Hello}`);
	    this.socket = new WebSocketIpml(url, this.protocol);
	    this.socket.onopen = this.onOpen.bind(this);
	    this.socket.onmessage = this.onMessage.bind(this);
	    this.socket.onerror = this.onError.bind(this);
	    this.socket.onclose = this.onClose.bind(this);
	    await connectionOpenedPromise;
	    const protocol = (_this$socket = this.socket) == null ? void 0 : _this$socket.protocol;
	    // Browsers don't autoclose on missing/wrong protocol
	    if (!protocol) {
	      throw new OBSWebSocketError(-1, 'Server sent no subprotocol');
	    }
	    if (protocol !== this.protocol) {
	      throw new OBSWebSocketError(-1, 'Server sent an invalid subprotocol');
	    }
	    return helloPromise;
	  }
	  /**
	   * Send identify message
	   *
	   * @private
	   * @param hello Hello message data
	   * @param password Password
	   * @param identificationParams Identification params
	   * @returns Hello & Identified messages data (combined)
	   */
	  async identify(_ref, password, identificationParams = {}) {
	    let {
	        authentication,
	        rpcVersion
	      } = _ref,
	      helloRest = _objectWithoutPropertiesLoose(_ref, _excluded);
	    // Set rpcVersion if unset
	    const data = _extends({
	      rpcVersion
	    }, identificationParams);
	    if (authentication && password) {
	      data.authentication = authenticationHashing(authentication.salt, authentication.challenge, password);
	    }
	    const identifiedPromise = this.internalEventPromise(`op:${WebSocketOpCode.Identified}`);
	    await this.message(WebSocketOpCode.Identify, data);
	    const identified = await identifiedPromise;
	    this._identified = true;
	    this.emit('Identified', identified);
	    return _extends({
	      rpcVersion
	    }, helloRest, identified);
	  }
	  /**
	   * Send message to obs-websocket
	   *
	   * @private
	   * @param op WebSocketOpCode
	   * @param d Message data
	   */
	  async message(op, d) {
	    if (!this.socket) {
	      throw new Error('Not connected');
	    }
	    if (!this.identified && op !== 1) {
	      throw new Error('Socket not identified');
	    }
	    const encoded = await this.encodeMessage({
	      op,
	      d
	    });
	    this.socket.send(encoded);
	  }
	  /**
	   * Create a promise to listen for an event on internal listener
	   * (will be cleaned up on disconnect)
	   *
	   * @private
	   * @param event Event to listen to
	   * @returns Event data
	   */
	  async internalEventPromise(event) {
	    return new Promise(resolve => {
	      this.internalListeners.once(event, resolve);
	    });
	  }
	  /**
	   * Websocket open event listener
	   *
	   * @private
	   * @param e Event
	   */
	  onOpen(e) {
	    debug('socket.open');
	    this.emit('ConnectionOpened');
	    this.internalListeners.emit('ConnectionOpened', e);
	  }
	  /**
	   * Websocket message event listener
	   *
	   * @private
	   * @param e Event
	   */
	  async onMessage(e) {
	    try {
	      const {
	        op,
	        d
	      } = await this.decodeMessage(e.data);
	      debug('socket.message: %d %j', op, d);
	      if (op === undefined || d === undefined) {
	        return;
	      }
	      switch (op) {
	        case WebSocketOpCode.Event:
	          {
	            const {
	              eventType,
	              eventData
	            } = d;
	            // @ts-expect-error Typescript just doesn't understand it
	            this.emit(eventType, eventData);
	            return;
	          }
	        case WebSocketOpCode.RequestResponse:
	        case WebSocketOpCode.RequestBatchResponse:
	          {
	            const {
	              requestId
	            } = d;
	            this.internalListeners.emit(`res:${requestId}`, d);
	            return;
	          }
	        default:
	          this.internalListeners.emit(`op:${op}`, d);
	      }
	    } catch (error) {
	      debug('error handling message: %o', error);
	    }
	  }
	  /**
	   * Websocket error event listener
	   *
	   * @private
	   * @param e ErrorEvent
	   */
	  onError(e) {
	    debug('socket.error: %o', e);
	    const error = new OBSWebSocketError(-1, e.message);
	    this.emit('ConnectionError', error);
	    this.internalListeners.emit('ConnectionError', error);
	  }
	  /**
	   * Websocket close event listener
	   *
	   * @private
	   * @param e Event
	   */
	  onClose(e) {
	    debug('socket.close: %s (%d)', e.reason, e.code);
	    const error = new OBSWebSocketError(e.code, e.reason);
	    this.emit('ConnectionClosed', error);
	    this.internalListeners.emit('ConnectionClosed', error);
	    this.cleanup();
	  }
	}
	BaseOBSWebSocket.requestCounter = 1;
	// https://github.com/developit/microbundle/issues/531#issuecomment-575473024
	// Not using ESM export due to it also being detected and breaking rollup based bundlers (vite)
	if (typeof exports !== 'undefined') {
	  Object.defineProperty(exports, '__esModule', {
	    value: true
	  });
	}

	class OBSWebSocket extends BaseOBSWebSocket {
	  constructor(...args) {
	    super(...args);
	    this.protocol = 'obswebsocket.json';
	  }
	  async encodeMessage(data) {
	    return JSON.stringify(data);
	  }
	  async decodeMessage(data) {
	    return JSON.parse(data);
	  }
	}

	const obs = new OBSWebSocket();

	async function sendCommand (command, params) {
	  try {
	    // if (command.indexOf('Set') === 0)
	    //  console.log('Sending command:', command, 'with params:', params)
	    return await obs.call(command, params || {})
	  } catch (e) {
	    console.log('Error sending command', command, ' - error is:', e.message);
	    return {}
	  }
	}

	obs.on('error', err => {
	  console.error('Socket error:', err);
	});

	/* src/ProgramPreview.svelte generated by Svelte v4.2.12 */

	const { console: console_1$4 } = globals;
	const file$6 = "src/ProgramPreview.svelte";

	function get_each_context$5(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[12] = list[i];
		return child_ctx;
	}

	// (103:2) {#if isStudioMode}
	function create_if_block$3(ctx) {
		let div0;
		let img;
		let t;
		let div1;
		let each_value = ensure_array_like_dev(/*transitions*/ ctx[3]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$5(get_each_context$5(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				div0 = element("div");
				img = element("img");
				t = space();
				div1 = element("div");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr_dev(img, "class", "has-background-dark");
				attr_dev(img, "alt", "Preview");
				add_location(img, file$6, 104, 6, 2926);
				attr_dev(div0, "class", "column");
				add_location(div0, file$6, 103, 4, 2899);
				attr_dev(div1, "class", "column is-narrow");
				add_location(div1, file$6, 106, 4, 3011);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div0, anchor);
				append_dev(div0, img);
				/*img_binding*/ ctx[7](img);
				insert_dev(target, t, anchor);
				insert_dev(target, div1, anchor);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(div1, null);
					}
				}
			},
			p: function update(ctx, dirty) {
				if (dirty & /*transitions*/ 8) {
					each_value = ensure_array_like_dev(/*transitions*/ ctx[3]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$5(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block$5(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(div1, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div0);
					detach_dev(t);
					detach_dev(div1);
				}

				/*img_binding*/ ctx[7](null);
				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block$3.name,
			type: "if",
			source: "(103:2) {#if isStudioMode}",
			ctx
		});

		return block;
	}

	// (108:6) {#each transitions as transition}
	function create_each_block$5(ctx) {
		let button;
		let t_value = /*transition*/ ctx[12].transitionName + "";
		let t;
		let mounted;
		let dispose;

		function click_handler() {
			return /*click_handler*/ ctx[8](/*transition*/ ctx[12]);
		}

		const block = {
			c: function create() {
				button = element("button");
				t = text(t_value);
				attr_dev(button, "class", "button is-fullwidth is-info");
				set_style(button, "margin-bottom", ".5rem");
				add_location(button, file$6, 108, 6, 3088);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, t);

				if (!mounted) {
					dispose = listen_dev(button, "click", click_handler, false, false, false, false);
					mounted = true;
				}
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;
				if (dirty & /*transitions*/ 8 && t_value !== (t_value = /*transition*/ ctx[12].transitionName + "")) set_data_dev(t, t_value);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block$5.name,
			type: "each",
			source: "(108:6) {#each transitions as transition}",
			ctx
		});

		return block;
	}

	function create_fragment$6(ctx) {
		let div1;
		let t;
		let div0;
		let img;
		let if_block = /*isStudioMode*/ ctx[0] && create_if_block$3(ctx);

		const block = {
			c: function create() {
				div1 = element("div");
				if (if_block) if_block.c();
				t = space();
				div0 = element("div");
				img = element("img");
				attr_dev(img, "alt", "Program");
				add_location(img, file$6, 118, 4, 3474);
				attr_dev(div0, "class", "column");
				add_location(div0, file$6, 117, 2, 3449);
				attr_dev(div1, "class", "columns is-centered is-vcentered has-text-centered");
				add_location(div1, file$6, 101, 0, 2809);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div1, anchor);
				if (if_block) if_block.m(div1, null);
				append_dev(div1, t);
				append_dev(div1, div0);
				append_dev(div0, img);
				/*img_binding_1*/ ctx[9](img);
			},
			p: function update(ctx, [dirty]) {
				if (/*isStudioMode*/ ctx[0]) {
					if (if_block) {
						if_block.p(ctx, dirty);
					} else {
						if_block = create_if_block$3(ctx);
						if_block.c();
						if_block.m(div1, t);
					}
				} else if (if_block) {
					if_block.d(1);
					if_block = null;
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div1);
				}

				if (if_block) if_block.d();
				/*img_binding_1*/ ctx[9](null);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$6.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$6($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('ProgramPreview', slots, []);
		let { imageFormat = 'jpg' } = $$props;
		let isStudioMode = false;
		let programScene = '';
		let previewScene = '';
		let program = {};
		let preview = {};
		let screenshotInterval;
		let transitions = [];

		// let currentTransition = ''
		onMount(async () => {
			let data;

			if (!programScene) {
				data = await sendCommand('GetCurrentProgramScene');
				$$invalidate(5, programScene = data.currentProgramSceneName || '');
			}

			data = await sendCommand('GetStudioModeEnabled');

			if (data && data.studioModeEnabled) {
				$$invalidate(0, isStudioMode = true);
				data = await sendCommand('GetCurrentPreviewScene');
				$$invalidate(6, previewScene = data.currentPreviewSceneName || '');
			}

			data = await sendCommand('GetSceneTransitionList');
			console.log('GetSceneTransitionList', data);
			$$invalidate(3, transitions = data.transitions || []);

			// currentTransition = data.currentSceneTransitionName || ''
			screenshotInterval = setInterval(getScreenshot, 1000);
		});

		onDestroy(() => {
			clearInterval(screenshotInterval);
		});

		obs.on('StudioModeStateChanged', async data => {
			console.log('StudioModeStateChanged', data.studioModeEnabled);
			$$invalidate(0, isStudioMode = data.studioModeEnabled);

			if (isStudioMode) {
				$$invalidate(6, previewScene = programScene);
			}
		});

		obs.on('CurrentPreviewSceneChanged', async data => {
			console.log('CurrentPreviewSceneChanged', data.sceneName);
			$$invalidate(6, previewScene = data.sceneName);
		});

		obs.on('CurrentProgramSceneChanged', async data => {
			console.log('CurrentProgramSceneChanged', data.sceneName);
			$$invalidate(5, programScene = data.sceneName);
		});

		obs.on('SceneNameChanged', async data => {
			if (data.oldSceneName === programScene) $$invalidate(5, programScene = data.sceneName);
			if (data.oldSceneName === previewScene) $$invalidate(6, previewScene = data.sceneName);
		});

		// TODO: does not exist???
		obs.on('TransitionListChanged', async data => {
			console.log('TransitionListChanged', data);
			$$invalidate(3, transitions = data.transitions || []);
		});

		async function getScreenshot() {
			if (!programScene) return;

			let data = await sendCommand('GetSourceScreenshot', {
				sourceName: programScene,
				imageFormat,
				imageWidth: 960,
				imageHeight: 540
			});

			if (data && data.imageData && program) {
				$$invalidate(1, program.src = data.imageData, program);
				$$invalidate(1, program.className = '', program);
			}

			if (isStudioMode) {
				if (previewScene !== programScene) {
					data = await sendCommand('GetSourceScreenshot', {
						sourceName: previewScene,
						imageFormat,
						imageWidth: 960,
						imageHeight: 540
					});
				}

				if (data && data.imageData && preview) {
					$$invalidate(2, preview.src = data.imageData, preview);
				}
			}
		}

		const writable_props = ['imageFormat'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$4.warn(`<ProgramPreview> was created with unknown prop '${key}'`);
		});

		function img_binding($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				preview = $$value;
				$$invalidate(2, preview);
			});
		}

		const click_handler = async transition => {
			await sendCommand('SetCurrentSceneTransition', {
				transitionName: transition.transitionName
			});

			await sendCommand('TriggerStudioModeTransition');
		};

		function img_binding_1($$value) {
			binding_callbacks[$$value ? 'unshift' : 'push'](() => {
				program = $$value;
				$$invalidate(1, program);
			});
		}

		$$self.$$set = $$props => {
			if ('imageFormat' in $$props) $$invalidate(4, imageFormat = $$props.imageFormat);
		};

		$$self.$capture_state = () => ({
			onMount,
			onDestroy,
			obs,
			sendCommand,
			imageFormat,
			isStudioMode,
			programScene,
			previewScene,
			program,
			preview,
			screenshotInterval,
			transitions,
			getScreenshot
		});

		$$self.$inject_state = $$props => {
			if ('imageFormat' in $$props) $$invalidate(4, imageFormat = $$props.imageFormat);
			if ('isStudioMode' in $$props) $$invalidate(0, isStudioMode = $$props.isStudioMode);
			if ('programScene' in $$props) $$invalidate(5, programScene = $$props.programScene);
			if ('previewScene' in $$props) $$invalidate(6, previewScene = $$props.previewScene);
			if ('program' in $$props) $$invalidate(1, program = $$props.program);
			if ('preview' in $$props) $$invalidate(2, preview = $$props.preview);
			if ('screenshotInterval' in $$props) screenshotInterval = $$props.screenshotInterval;
			if ('transitions' in $$props) $$invalidate(3, transitions = $$props.transitions);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*programScene, previewScene*/ 96) {
				// eslint-disable-next-line
				(getScreenshot());
			}
		};

		return [
			isStudioMode,
			program,
			preview,
			transitions,
			imageFormat,
			programScene,
			previewScene,
			img_binding,
			click_handler,
			img_binding_1
		];
	}

	class ProgramPreview extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$6, create_fragment$6, safe_not_equal, { imageFormat: 4 });

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "ProgramPreview",
				options,
				id: create_fragment$6.name
			});
		}

		get imageFormat() {
			throw new Error("<ProgramPreview>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set imageFormat(value) {
			throw new Error("<ProgramPreview>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/SourceButton.svelte generated by Svelte v4.2.12 */
	const file$5 = "src/SourceButton.svelte";

	// (26:2) {#if img}
	function create_if_block_1$1(ctx) {
		let img_1;
		let img_1_src_value;

		const block = {
			c: function create() {
				img_1 = element("img");
				if (!src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[4])) attr_dev(img_1, "src", img_1_src_value);
				attr_dev(img_1, "alt", /*name*/ ctx[0]);
				attr_dev(img_1, "class", "thumbnail svelte-xcafbk");
				add_location(img_1, file$5, 25, 11, 648);
			},
			m: function mount(target, anchor) {
				insert_dev(target, img_1, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*img*/ 16 && !src_url_equal(img_1.src, img_1_src_value = /*img*/ ctx[4])) {
					attr_dev(img_1, "src", img_1_src_value);
				}

				if (dirty & /*name*/ 1) {
					attr_dev(img_1, "alt", /*name*/ ctx[0]);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(img_1);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_1$1.name,
			type: "if",
			source: "(26:2) {#if img}",
			ctx
		});

		return block;
	}

	// (27:2) {#if buttonStyle !== 'icon'}
	function create_if_block$2(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text(/*name*/ ctx[0]);
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*name*/ 1) set_data_dev(t, /*name*/ ctx[0]);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block$2.name,
			type: "if",
			source: "(27:2) {#if buttonStyle !== 'icon'}",
			ctx
		});

		return block;
	}

	function create_fragment$5(ctx) {
		let button;
		let t;
		let button_style_value;
		let mounted;
		let dispose;
		let if_block0 = /*img*/ ctx[4] && create_if_block_1$1(ctx);
		let if_block1 = /*buttonStyle*/ ctx[1] !== 'icon' && create_if_block$2(ctx);

		const block = {
			c: function create() {
				button = element("button");
				if (if_block0) if_block0.c();
				t = space();
				if (if_block1) if_block1.c();

				attr_dev(button, "style", button_style_value = /*buttonStyle*/ ctx[1] === 'icon'
				? /*style*/ ctx[5]
				: '');

				attr_dev(button, "title", /*name*/ ctx[0]);
				attr_dev(button, "class", "svelte-xcafbk");
				toggle_class(button, "title", /*buttonStyle*/ ctx[1] === 'text');
				toggle_class(button, "program", /*isProgram*/ ctx[2]);
				toggle_class(button, "preview", /*isPreview*/ ctx[3]);
				toggle_class(button, "with-icon", /*buttonStyle*/ ctx[1] === 'icon');
				add_location(button, file$5, 16, 0, 389);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				if (if_block0) if_block0.m(button, null);
				append_dev(button, t);
				if (if_block1) if_block1.m(button, null);

				if (!mounted) {
					dispose = listen_dev(button, "click", /*click_handler*/ ctx[8], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (/*img*/ ctx[4]) {
					if (if_block0) {
						if_block0.p(ctx, dirty);
					} else {
						if_block0 = create_if_block_1$1(ctx);
						if_block0.c();
						if_block0.m(button, t);
					}
				} else if (if_block0) {
					if_block0.d(1);
					if_block0 = null;
				}

				if (/*buttonStyle*/ ctx[1] !== 'icon') {
					if (if_block1) {
						if_block1.p(ctx, dirty);
					} else {
						if_block1 = create_if_block$2(ctx);
						if_block1.c();
						if_block1.m(button, null);
					}
				} else if (if_block1) {
					if_block1.d(1);
					if_block1 = null;
				}

				if (dirty & /*buttonStyle, style*/ 34 && button_style_value !== (button_style_value = /*buttonStyle*/ ctx[1] === 'icon'
				? /*style*/ ctx[5]
				: '')) {
					attr_dev(button, "style", button_style_value);
				}

				if (dirty & /*name*/ 1) {
					attr_dev(button, "title", /*name*/ ctx[0]);
				}

				if (dirty & /*buttonStyle*/ 2) {
					toggle_class(button, "title", /*buttonStyle*/ ctx[1] === 'text');
				}

				if (dirty & /*isProgram*/ 4) {
					toggle_class(button, "program", /*isProgram*/ ctx[2]);
				}

				if (dirty & /*isPreview*/ 8) {
					toggle_class(button, "preview", /*isPreview*/ ctx[3]);
				}

				if (dirty & /*buttonStyle*/ 2) {
					toggle_class(button, "with-icon", /*buttonStyle*/ ctx[1] === 'icon');
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				if (if_block0) if_block0.d();
				if (if_block1) if_block1.d();
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$5.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$5($$self, $$props, $$invalidate) {
		let style;
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('SourceButton', slots, []);
		let { name } = $$props;
		let { buttonStyle = 'text' } = $$props;
		let { icon = '#ffffff' } = $$props;
		let { isProgram = false } = $$props;
		let { isPreview = false } = $$props;
		let { img = '' } = $$props;
		const dispatch = createEventDispatcher();

		$$self.$$.on_mount.push(function () {
			if (name === undefined && !('name' in $$props || $$self.$$.bound[$$self.$$.props['name']])) {
				console.warn("<SourceButton> was created without expected prop 'name'");
			}
		});

		const writable_props = ['name', 'buttonStyle', 'icon', 'isProgram', 'isPreview', 'img'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SourceButton> was created with unknown prop '${key}'`);
		});

		const click_handler = () => dispatch('click');

		$$self.$$set = $$props => {
			if ('name' in $$props) $$invalidate(0, name = $$props.name);
			if ('buttonStyle' in $$props) $$invalidate(1, buttonStyle = $$props.buttonStyle);
			if ('icon' in $$props) $$invalidate(7, icon = $$props.icon);
			if ('isProgram' in $$props) $$invalidate(2, isProgram = $$props.isProgram);
			if ('isPreview' in $$props) $$invalidate(3, isPreview = $$props.isPreview);
			if ('img' in $$props) $$invalidate(4, img = $$props.img);
		};

		$$self.$capture_state = () => ({
			name,
			buttonStyle,
			icon,
			isProgram,
			isPreview,
			img,
			createEventDispatcher,
			dispatch,
			style
		});

		$$self.$inject_state = $$props => {
			if ('name' in $$props) $$invalidate(0, name = $$props.name);
			if ('buttonStyle' in $$props) $$invalidate(1, buttonStyle = $$props.buttonStyle);
			if ('icon' in $$props) $$invalidate(7, icon = $$props.icon);
			if ('isProgram' in $$props) $$invalidate(2, isProgram = $$props.isProgram);
			if ('isPreview' in $$props) $$invalidate(3, isPreview = $$props.isPreview);
			if ('img' in $$props) $$invalidate(4, img = $$props.img);
			if ('style' in $$props) $$invalidate(5, style = $$props.style);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*icon*/ 128) {
				$$invalidate(5, style = icon.startsWith('#')
				? `background-color: ${icon};`
				: `background-image: url(${icon});`);
			}
		};

		return [
			name,
			buttonStyle,
			isProgram,
			isPreview,
			img,
			style,
			dispatch,
			icon,
			click_handler
		];
	}

	class SourceButton extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance$5, create_fragment$5, safe_not_equal, {
				name: 0,
				buttonStyle: 1,
				icon: 7,
				isProgram: 2,
				isPreview: 3,
				img: 4
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "SourceButton",
				options,
				id: create_fragment$5.name
			});
		}

		get name() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set name(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get buttonStyle() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set buttonStyle(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get icon() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set icon(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get isProgram() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set isProgram(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get isPreview() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set isPreview(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get img() {
			throw new Error("<SourceButton>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set img(value) {
			throw new Error("<SourceButton>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/SceneSwitcher.svelte generated by Svelte v4.2.12 */

	const { console: console_1$3 } = globals;
	const file$4 = "src/SceneSwitcher.svelte";

	function get_each_context_1(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[11] = list[i];
		return child_ctx;
	}

	function get_each_context$4(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[11] = list[i];
		return child_ctx;
	}

	// (111:2) {:else}
	function create_else_block$1(ctx) {
		let each_1_anchor;
		let current;
		let each_value_1 = ensure_array_like_dev(/*scenesFiltered*/ ctx[6]);
		let each_blocks = [];

		for (let i = 0; i < each_value_1.length; i += 1) {
			each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
		}

		const out = i => transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

		const block = {
			c: function create() {
				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				if (dirty & /*scenesFiltered, programScene, previewScene, buttonStyle, sceneIcons, Math, sceneClicker*/ 238) {
					each_value_1 = ensure_array_like_dev(/*scenesFiltered*/ ctx[6]);
					let i;

					for (i = 0; i < each_value_1.length; i += 1) {
						const child_ctx = get_each_context_1(ctx, each_value_1, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
							transition_in(each_blocks[i], 1);
						} else {
							each_blocks[i] = create_each_block_1(child_ctx);
							each_blocks[i].c();
							transition_in(each_blocks[i], 1);
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					group_outros();

					for (i = each_value_1.length; i < each_blocks.length; i += 1) {
						out(i);
					}

					check_outros();
				}
			},
			i: function intro(local) {
				if (current) return;

				for (let i = 0; i < each_value_1.length; i += 1) {
					transition_in(each_blocks[i]);
				}

				current = true;
			},
			o: function outro(local) {
				each_blocks = each_blocks.filter(Boolean);

				for (let i = 0; i < each_blocks.length; i += 1) {
					transition_out(each_blocks[i]);
				}

				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(each_1_anchor);
				}

				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block$1.name,
			type: "else",
			source: "(111:2) {:else}",
			ctx
		});

		return block;
	}

	// (100:2) {#if editable}
	function create_if_block$1(ctx) {
		let each_1_anchor;
		let each_value = ensure_array_like_dev(/*scenes*/ ctx[0].reverse());
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$4(get_each_context$4(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*scenes, sceneIcons, onIconChange, onNameChange*/ 801) {
					each_value = ensure_array_like_dev(/*scenes*/ ctx[0].reverse());
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$4(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block$4(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(each_1_anchor);
				}

				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block$1.name,
			type: "if",
			source: "(100:2) {#if editable}",
			ctx
		});

		return block;
	}

	// (112:4) {#each scenesFiltered as scene}
	function create_each_block_1(ctx) {
		let li;
		let sourcebutton;
		let t;
		let current;

		sourcebutton = new SourceButton({
				props: {
					name: /*scene*/ ctx[11].sceneName,
					isProgram: /*programScene*/ ctx[1] === /*scene*/ ctx[11].sceneName,
					isPreview: /*previewScene*/ ctx[2] === /*scene*/ ctx[11].sceneName,
					buttonStyle: /*buttonStyle*/ ctx[3],
					icon: /*sceneIcons*/ ctx[5][/*scene*/ ctx[11].sceneName] || `#${Math.floor(Math.random() * 16777215).toString(16)}`
				},
				$$inline: true
			});

		sourcebutton.$on("click", function () {
			if (is_function(/*sceneClicker*/ ctx[7](/*scene*/ ctx[11]))) /*sceneClicker*/ ctx[7](/*scene*/ ctx[11]).apply(this, arguments);
		});

		const block = {
			c: function create() {
				li = element("li");
				create_component(sourcebutton.$$.fragment);
				t = space();
				attr_dev(li, "class", "svelte-1ht1wm3");
				add_location(li, file$4, 112, 4, 3591);
			},
			m: function mount(target, anchor) {
				insert_dev(target, li, anchor);
				mount_component(sourcebutton, li, null);
				append_dev(li, t);
				current = true;
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;
				const sourcebutton_changes = {};
				if (dirty & /*scenesFiltered*/ 64) sourcebutton_changes.name = /*scene*/ ctx[11].sceneName;
				if (dirty & /*programScene, scenesFiltered*/ 66) sourcebutton_changes.isProgram = /*programScene*/ ctx[1] === /*scene*/ ctx[11].sceneName;
				if (dirty & /*previewScene, scenesFiltered*/ 68) sourcebutton_changes.isPreview = /*previewScene*/ ctx[2] === /*scene*/ ctx[11].sceneName;
				if (dirty & /*buttonStyle*/ 8) sourcebutton_changes.buttonStyle = /*buttonStyle*/ ctx[3];
				if (dirty & /*sceneIcons, scenesFiltered*/ 96) sourcebutton_changes.icon = /*sceneIcons*/ ctx[5][/*scene*/ ctx[11].sceneName] || `#${Math.floor(Math.random() * 16777215).toString(16)}`;
				sourcebutton.$set(sourcebutton_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(sourcebutton.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sourcebutton.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(li);
				}

				destroy_component(sourcebutton);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block_1.name,
			type: "each",
			source: "(112:4) {#each scenesFiltered as scene}",
			ctx
		});

		return block;
	}

	// (101:4) {#each scenes.reverse() as scene}
	function create_each_block$4(ctx) {
		let li;
		let label0;
		let t1;
		let input0;
		let input0_title_value;
		let input0_value_value;
		let t2;
		let label1;
		let t4;
		let input1;
		let input1_title_value;
		let input1_value_value;
		let t5;
		let mounted;
		let dispose;

		const block = {
			c: function create() {
				li = element("li");
				label0 = element("label");
				label0.textContent = "Name";
				t1 = space();
				input0 = element("input");
				t2 = space();
				label1 = element("label");
				label1.textContent = "Icon";
				t4 = space();
				input1 = element("input");
				t5 = space();
				attr_dev(label0, "class", "label");
				add_location(label0, file$4, 103, 6, 3134);
				attr_dev(input0, "type", "text");
				attr_dev(input0, "class", "input");
				attr_dev(input0, "title", input0_title_value = /*scene*/ ctx[11].sceneName);
				input0.value = input0_value_value = /*scene*/ ctx[11].sceneName;
				add_location(input0, file$4, 104, 6, 3174);
				attr_dev(label1, "class", "label");
				add_location(label1, file$4, 106, 6, 3352);
				attr_dev(input1, "type", "text");
				attr_dev(input1, "class", "input");
				attr_dev(input1, "title", input1_title_value = /*scene*/ ctx[11].sceneName);
				input1.value = input1_value_value = /*sceneIcons*/ ctx[5][/*scene*/ ctx[11].sceneName] || '';
				add_location(input1, file$4, 107, 6, 3392);
				attr_dev(li, "class", "svelte-1ht1wm3");
				add_location(li, file$4, 101, 4, 3060);
			},
			m: function mount(target, anchor) {
				insert_dev(target, li, anchor);
				append_dev(li, label0);
				append_dev(li, t1);
				append_dev(li, input0);
				append_dev(li, t2);
				append_dev(li, label1);
				append_dev(li, t4);
				append_dev(li, input1);
				append_dev(li, t5);

				if (!mounted) {
					dispose = [
						listen_dev(input0, "change", /*onNameChange*/ ctx[8], false, false, false, false),
						listen_dev(input1, "change", /*onIconChange*/ ctx[9], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				if (dirty & /*scenes*/ 1 && input0_title_value !== (input0_title_value = /*scene*/ ctx[11].sceneName)) {
					attr_dev(input0, "title", input0_title_value);
				}

				if (dirty & /*scenes*/ 1 && input0_value_value !== (input0_value_value = /*scene*/ ctx[11].sceneName) && input0.value !== input0_value_value) {
					prop_dev(input0, "value", input0_value_value);
				}

				if (dirty & /*scenes*/ 1 && input1_title_value !== (input1_title_value = /*scene*/ ctx[11].sceneName)) {
					attr_dev(input1, "title", input1_title_value);
				}

				if (dirty & /*sceneIcons, scenes*/ 33 && input1_value_value !== (input1_value_value = /*sceneIcons*/ ctx[5][/*scene*/ ctx[11].sceneName] || '') && input1.value !== input1_value_value) {
					prop_dev(input1, "value", input1_value_value);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(li);
				}

				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block$4.name,
			type: "each",
			source: "(101:4) {#each scenes.reverse() as scene}",
			ctx
		});

		return block;
	}

	function create_fragment$4(ctx) {
		let ol;
		let current_block_type_index;
		let if_block;
		let current;
		const if_block_creators = [create_if_block$1, create_else_block$1];
		const if_blocks = [];

		function select_block_type(ctx, dirty) {
			if (/*editable*/ ctx[4]) return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		const block = {
			c: function create() {
				ol = element("ol");
				if_block.c();
				attr_dev(ol, "class", "svelte-1ht1wm3");
				toggle_class(ol, "column", /*editable*/ ctx[4]);
				toggle_class(ol, "with-icon", /*buttonStyle*/ ctx[3] === 'icon');
				add_location(ol, file$4, 95, 0, 2924);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, ol, anchor);
				if_blocks[current_block_type_index].m(ol, null);
				current = true;
			},
			p: function update(ctx, [dirty]) {
				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);

				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(ol, null);
				}

				if (!current || dirty & /*editable*/ 16) {
					toggle_class(ol, "column", /*editable*/ ctx[4]);
				}

				if (!current || dirty & /*buttonStyle*/ 8) {
					toggle_class(ol, "with-icon", /*buttonStyle*/ ctx[3] === 'icon');
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(ol);
				}

				if_blocks[current_block_type_index].d();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$4.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$4($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('SceneSwitcher', slots, []);
		let { programScene = {} } = $$props;
		let { previewScene = {} } = $$props;
		let { scenes = [] } = $$props;
		let { buttonStyle = 'text' } = $$props; // text, screenshot, icon
		let { editable = false } = $$props;
		let scenesFiltered = [];
		let isStudioMode = false;
		const sceneIcons = JSON.parse(window.localStorage.getItem('sceneIcons') || '{}');

		onMount(async function () {
			let data = await sendCommand('GetSceneList');
			console.log('GetSceneList', data);
			$$invalidate(1, programScene = data.currentProgramSceneName || '');
			$$invalidate(2, previewScene = data.currentPreviewSceneName);
			$$invalidate(0, scenes = data.scenes);
			data = await sendCommand('GetStudioModeEnabled');

			if (data && data.studioModeEnabled) {
				isStudioMode = true;
				$$invalidate(2, previewScene = data.currentPreviewSceneName || '');
			}
		});

		obs.on('StudioModeStateChanged', async data => {
			console.log('StudioModeStateChanged', data.studioModeEnabled);
			isStudioMode = data.studioModeEnabled;
			$$invalidate(2, previewScene = programScene);
		});

		obs.on('SceneListChanged', async data => {
			console.log('SceneListChanged', data.scenes.length);
			$$invalidate(0, scenes = data.scenes);
		});

		obs.on('SceneCreated', async data => {
			console.log('SceneCreated', data);
		});

		obs.on('SceneRemoved', async data => {
			console.log('SceneRemoved', data);

			for (let i = 0; i < scenes.length; i++) {
				if (scenes[i].sceneName === data.sceneName) {
					delete scenes[i];
				}
			}
		});

		obs.on('SceneNameChanged', async data => {
			console.log('SceneNameChanged', data);

			for (let i = 0; i < scenes.length; i++) {
				if (scenes[i].sceneName === data.oldSceneName) {
					$$invalidate(0, scenes[i].sceneName = data.sceneName, scenes);
				}
			}

			// Rename in sceneIcons
			$$invalidate(5, sceneIcons[data.sceneName] = sceneIcons[data.oldSceneName], sceneIcons);
		});

		obs.on('CurrentProgramSceneChanged', data => {
			console.log('CurrentProgramSceneChanged', data);
			$$invalidate(1, programScene = data.sceneName || '');
		});

		obs.on('CurrentPreviewSceneChanged', async data => {
			console.log('CurrentPreviewSceneChanged', data);
			$$invalidate(2, previewScene = data.sceneName);
		});

		function sceneClicker(scene) {
			return async function () {
				if (isStudioMode) {
					await sendCommand('SetCurrentPreviewScene', { sceneName: scene.sceneName });
				} else {
					await sendCommand('SetCurrentProgramScene', { sceneName: scene.sceneName });
				}
			};
		}

		function onNameChange(event) {
			sendCommand('SetSceneName', {
				sceneName: event.target.title,
				newSceneName: event.target.value
			});
		}

		function onIconChange(event) {
			$$invalidate(5, sceneIcons[event.target.title] = event.target.value, sceneIcons);
		}

		const writable_props = ['programScene', 'previewScene', 'scenes', 'buttonStyle', 'editable'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$3.warn(`<SceneSwitcher> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('programScene' in $$props) $$invalidate(1, programScene = $$props.programScene);
			if ('previewScene' in $$props) $$invalidate(2, previewScene = $$props.previewScene);
			if ('scenes' in $$props) $$invalidate(0, scenes = $$props.scenes);
			if ('buttonStyle' in $$props) $$invalidate(3, buttonStyle = $$props.buttonStyle);
			if ('editable' in $$props) $$invalidate(4, editable = $$props.editable);
		};

		$$self.$capture_state = () => ({
			onMount,
			obs,
			sendCommand,
			SourceButton,
			programScene,
			previewScene,
			scenes,
			buttonStyle,
			editable,
			scenesFiltered,
			isStudioMode,
			sceneIcons,
			sceneClicker,
			onNameChange,
			onIconChange
		});

		$$self.$inject_state = $$props => {
			if ('programScene' in $$props) $$invalidate(1, programScene = $$props.programScene);
			if ('previewScene' in $$props) $$invalidate(2, previewScene = $$props.previewScene);
			if ('scenes' in $$props) $$invalidate(0, scenes = $$props.scenes);
			if ('buttonStyle' in $$props) $$invalidate(3, buttonStyle = $$props.buttonStyle);
			if ('editable' in $$props) $$invalidate(4, editable = $$props.editable);
			if ('scenesFiltered' in $$props) $$invalidate(6, scenesFiltered = $$props.scenesFiltered);
			if ('isStudioMode' in $$props) isStudioMode = $$props.isStudioMode;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty & /*scenes*/ 1) {
				$$invalidate(6, scenesFiltered = scenes.filter(scene => scene.sceneName.indexOf('(hidden)') === -1).reverse());
			}

			if ($$self.$$.dirty & /*sceneIcons*/ 32) {
				// store sceneIcons on change
				window.localStorage.setItem('sceneIcons', JSON.stringify(sceneIcons));
			}
		};

		return [
			scenes,
			programScene,
			previewScene,
			buttonStyle,
			editable,
			sceneIcons,
			scenesFiltered,
			sceneClicker,
			onNameChange,
			onIconChange
		];
	}

	class SceneSwitcher extends SvelteComponentDev {
		constructor(options) {
			super(options);

			init(this, options, instance$4, create_fragment$4, safe_not_equal, {
				programScene: 1,
				previewScene: 2,
				scenes: 0,
				buttonStyle: 3,
				editable: 4
			});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "SceneSwitcher",
				options,
				id: create_fragment$4.name
			});
		}

		get programScene() {
			throw new Error("<SceneSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set programScene(value) {
			throw new Error("<SceneSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get previewScene() {
			throw new Error("<SceneSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set previewScene(value) {
			throw new Error("<SceneSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get scenes() {
			throw new Error("<SceneSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set scenes(value) {
			throw new Error("<SceneSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get buttonStyle() {
			throw new Error("<SceneSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set buttonStyle(value) {
			throw new Error("<SceneSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get editable() {
			throw new Error("<SceneSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set editable(value) {
			throw new Error("<SceneSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/SourceSwitcher.svelte generated by Svelte v4.2.12 */
	const file$3 = "src/SourceSwitcher.svelte";

	function get_each_context$3(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[11] = list[i];
		return child_ctx;
	}

	// (122:2) {#each items as item}
	function create_each_block$3(ctx) {
		let li;
		let sourcebutton;
		let t;
		let current;

		sourcebutton = new SourceButton({
				props: {
					name: /*item*/ ctx[11].sourceName,
					isProgram: /*item*/ ctx[11].sceneItemEnabled,
					img: /*item*/ ctx[11].img,
					buttonStyle: /*buttonStyle*/ ctx[0]
				},
				$$inline: true
			});

		sourcebutton.$on("click", function () {
			if (is_function(/*backgroundClicker*/ ctx[2](/*item*/ ctx[11].sceneItemId))) /*backgroundClicker*/ ctx[2](/*item*/ ctx[11].sceneItemId).apply(this, arguments);
		});

		const block = {
			c: function create() {
				li = element("li");
				create_component(sourcebutton.$$.fragment);
				t = space();
				attr_dev(li, "class", "svelte-1mfq7n9");
				add_location(li, file$3, 122, 2, 3356);
			},
			m: function mount(target, anchor) {
				insert_dev(target, li, anchor);
				mount_component(sourcebutton, li, null);
				append_dev(li, t);
				current = true;
			},
			p: function update(new_ctx, dirty) {
				ctx = new_ctx;
				const sourcebutton_changes = {};
				if (dirty & /*items*/ 2) sourcebutton_changes.name = /*item*/ ctx[11].sourceName;
				if (dirty & /*items*/ 2) sourcebutton_changes.isProgram = /*item*/ ctx[11].sceneItemEnabled;
				if (dirty & /*items*/ 2) sourcebutton_changes.img = /*item*/ ctx[11].img;
				if (dirty & /*buttonStyle*/ 1) sourcebutton_changes.buttonStyle = /*buttonStyle*/ ctx[0];
				sourcebutton.$set(sourcebutton_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(sourcebutton.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sourcebutton.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(li);
				}

				destroy_component(sourcebutton);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block$3.name,
			type: "each",
			source: "(122:2) {#each items as item}",
			ctx
		});

		return block;
	}

	function create_fragment$3(ctx) {
		let ol;
		let t0;
		let button;
		let current;
		let mounted;
		let dispose;
		let each_value = ensure_array_like_dev(/*items*/ ctx[1]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$3(get_each_context$3(ctx, each_value, i));
		}

		const out = i => transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

		const block = {
			c: function create() {
				ol = element("ol");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				t0 = space();
				button = element("button");
				button.textContent = "Load missing thumbnails";
				attr_dev(ol, "class", "svelte-1mfq7n9");
				add_location(ol, file$3, 120, 0, 3325);
				attr_dev(button, "class", "button");
				add_location(button, file$3, 132, 0, 3579);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, ol, anchor);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(ol, null);
					}
				}

				insert_dev(target, t0, anchor);
				insert_dev(target, button, anchor);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*loadMissingScreenshots*/ ctx[3], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*items, buttonStyle, backgroundClicker*/ 7) {
					each_value = ensure_array_like_dev(/*items*/ ctx[1]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$3(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
							transition_in(each_blocks[i], 1);
						} else {
							each_blocks[i] = create_each_block$3(child_ctx);
							each_blocks[i].c();
							transition_in(each_blocks[i], 1);
							each_blocks[i].m(ol, null);
						}
					}

					group_outros();

					for (i = each_value.length; i < each_blocks.length; i += 1) {
						out(i);
					}

					check_outros();
				}
			},
			i: function intro(local) {
				if (current) return;

				for (let i = 0; i < each_value.length; i += 1) {
					transition_in(each_blocks[i]);
				}

				current = true;
			},
			o: function outro(local) {
				each_blocks = each_blocks.filter(Boolean);

				for (let i = 0; i < each_blocks.length; i += 1) {
					transition_out(each_blocks[i]);
				}

				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(ol);
					detach_dev(t0);
					detach_dev(button);
				}

				destroy_each(each_blocks, detaching);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$3.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$3($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('SourceSwitcher', slots, []);
		let { buttonStyle = 'screenshot' } = $$props;
		let { name = 'Backgrounds (hidden)' } = $$props;
		let { imageFormat = 'jpg' } = $$props;
		let items = [];
		const itemsIndex = {};
		let currentItemId = '';
		const screenshottedIds = new Set();

		onMount(async function () {
			await refreshItems();
		});

		async function refreshItems() {
			const data = await sendCommand('GetSceneItemList', { sceneName: name });
			$$invalidate(1, items = data.sceneItems || items);

			for (let i = 0; i < items.length; i++) {
				const item = items[i];
				itemsIndex[item.sceneItemId] = i;

				if (item.sceneItemEnabled) {
					currentItemId = item.sceneItemId;
				}
			}

			for (let i = 0; i < items.length; i++) {
				$$invalidate(1, items[i].img = await getItemScreenshot(items[i]), items);
			}
		}

		obs.on('SceneItemEnableStateChanged', async data => {
			if (data.sceneName === name) {
				const i = itemsIndex[data.sceneItemId];
				$$invalidate(1, items[i].sceneItemEnabled = data.sceneItemEnabled, items);

				if (items[i].sceneItemEnabled && !items[i].img) {
					$$invalidate(1, items[i].img = await getItemScreenshot(items[i]), items);

					if (screenshottedIds.has(items[i].sceneItemId)) {
						$$invalidate(1, items[i].img = await getItemScreenshot(items[i]), items);

						await sendCommand('SetSceneItemEnabled', {
							sceneName: name,
							sceneItemId: items[i].sceneItemId,
							sceneItemEnabled: false
						});

						screenshottedIds.delete(items[i].sceneItemId);
					}
				}
			}
		});

		obs.on('SceneItemListReindexed', async data => {
			if (data.sceneName === name) {
				await refreshItems();
			}
		});

		obs.on('SceneItemCreated', async data => {
			if (data.sceneName === name) {
				await refreshItems();
			}
		});

		obs.on('SceneItemRemoved', async data => {
			if (data.sceneName === name) {
				await refreshItems();
			}
		});

		function backgroundClicker(itemId) {
			return async function () {
				await sendCommand('SetSceneItemEnabled', {
					sceneName: name,
					sceneItemId: itemId,
					sceneItemEnabled: true
				});

				if (currentItemId !== itemId) {
					await sendCommand('SetSceneItemEnabled', {
						sceneName: name,
						sceneItemId: currentItemId,
						sceneItemEnabled: false
					});
				}

				currentItemId = itemId;
			};
		}

		async function getItemScreenshot(item) {
			if (item.img) return item.img;
			let data = null;
			let retry = item.sceneItemEnabled ? 3 : 1;

			while (retry--) {
				// Random sleep to avoid burst of thumbnail rendering
				await new Promise(resolve => setTimeout(resolve, Math.random() * 500 + 100));

				data = await sendCommand('GetSourceScreenshot', {
					sourceName: item.sourceName,
					imageFormat,
					width: 192,
					height: 108
				});

				if (data && data.imageData) {
					return data.imageData;
				}
			}
		}

		async function loadMissingScreenshots() {
			for (let i = 0; i < items.length; i++) {
				if (!items[i].img) {
					await sendCommand('SetSceneItemEnabled', {
						sceneName: name,
						sceneItemId: items[i].sceneItemId,
						sceneItemEnabled: true
					});

					screenshottedIds.add(items[i].sceneItemId);
				}
			}
		}

		const writable_props = ['buttonStyle', 'name', 'imageFormat'];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<SourceSwitcher> was created with unknown prop '${key}'`);
		});

		$$self.$$set = $$props => {
			if ('buttonStyle' in $$props) $$invalidate(0, buttonStyle = $$props.buttonStyle);
			if ('name' in $$props) $$invalidate(4, name = $$props.name);
			if ('imageFormat' in $$props) $$invalidate(5, imageFormat = $$props.imageFormat);
		};

		$$self.$capture_state = () => ({
			buttonStyle,
			name,
			imageFormat,
			items,
			itemsIndex,
			currentItemId,
			screenshottedIds,
			onMount,
			obs,
			sendCommand,
			SourceButton,
			refreshItems,
			backgroundClicker,
			getItemScreenshot,
			loadMissingScreenshots
		});

		$$self.$inject_state = $$props => {
			if ('buttonStyle' in $$props) $$invalidate(0, buttonStyle = $$props.buttonStyle);
			if ('name' in $$props) $$invalidate(4, name = $$props.name);
			if ('imageFormat' in $$props) $$invalidate(5, imageFormat = $$props.imageFormat);
			if ('items' in $$props) $$invalidate(1, items = $$props.items);
			if ('currentItemId' in $$props) currentItemId = $$props.currentItemId;
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [
			buttonStyle,
			items,
			backgroundClicker,
			loadMissingScreenshots,
			name,
			imageFormat
		];
	}

	class SourceSwitcher extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$3, create_fragment$3, safe_not_equal, { buttonStyle: 0, name: 4, imageFormat: 5 });

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "SourceSwitcher",
				options,
				id: create_fragment$3.name
			});
		}

		get buttonStyle() {
			throw new Error("<SourceSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set buttonStyle(value) {
			throw new Error("<SourceSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get name() {
			throw new Error("<SourceSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set name(value) {
			throw new Error("<SourceSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		get imageFormat() {
			throw new Error("<SourceSwitcher>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}

		set imageFormat(value) {
			throw new Error("<SourceSwitcher>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
		}
	}

	/* src/ProfileSelect.svelte generated by Svelte v4.2.12 */

	const { console: console_1$2 } = globals;
	const file$2 = "src/ProfileSelect.svelte";

	function get_each_context$2(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[4] = list[i];
		return child_ctx;
	}

	// (30:2) {#each profiles as profile}
	function create_each_block$2(ctx) {
		let option;
		let t_value = /*profile*/ ctx[4] + "";
		let t;
		let option_value_value;

		const block = {
			c: function create() {
				option = element("option");
				t = text(t_value);
				option.__value = option_value_value = /*profile*/ ctx[4];
				set_input_value(option, option.__value);
				add_location(option, file$2, 30, 4, 937);
			},
			m: function mount(target, anchor) {
				insert_dev(target, option, anchor);
				append_dev(option, t);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*profiles*/ 1 && t_value !== (t_value = /*profile*/ ctx[4] + "")) set_data_dev(t, t_value);

				if (dirty & /*profiles*/ 1 && option_value_value !== (option_value_value = /*profile*/ ctx[4])) {
					prop_dev(option, "__value", option_value_value);
					set_input_value(option, option.__value);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(option);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block$2.name,
			type: "each",
			source: "(30:2) {#each profiles as profile}",
			ctx
		});

		return block;
	}

	function create_fragment$2(ctx) {
		let div;
		let select;
		let mounted;
		let dispose;
		let each_value = ensure_array_like_dev(/*profiles*/ ctx[0]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				div = element("div");
				select = element("select");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr_dev(select, "title", "Change Profile");
				if (/*currentProfile*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[3].call(select));
				add_location(select, file$2, 28, 2, 813);
				attr_dev(div, "class", "select");
				set_style(div, "margin", "0 .5rem .5rem 0");
				add_location(div, file$2, 27, 0, 757);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div, anchor);
				append_dev(div, select);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(select, null);
					}
				}

				select_option(select, /*currentProfile*/ ctx[1], true);

				if (!mounted) {
					dispose = [
						listen_dev(select, "change", /*select_change_handler*/ ctx[3]),
						listen_dev(select, "change", /*setCurrentProfile*/ ctx[2], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*profiles*/ 1) {
					each_value = ensure_array_like_dev(/*profiles*/ ctx[0]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$2(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block$2(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}

				if (dirty & /*currentProfile, profiles*/ 3) {
					select_option(select, /*currentProfile*/ ctx[1]);
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div);
				}

				destroy_each(each_blocks, detaching);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$2.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$2($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('ProfileSelect', slots, []);
		let profiles = [];
		let currentProfile = '';

		onMount(async function () {
			const data = await sendCommand('GetProfileList');
			$$invalidate(0, profiles = data.profiles || []);
			$$invalidate(1, currentProfile = data.currentProfileName || '');
		});

		obs.on('CurrentProfileChanged', async data => {
			console.log('CurrentProfileChanged', data.profileName);
			$$invalidate(1, currentProfile = data.profileName || '');
		});

		obs.on('ProfileListChanged', async data => {
			console.log('ProfileListChanged', data.profiles.length);
			$$invalidate(0, profiles = data.profiles || []);
		});

		async function setCurrentProfile(event) {
			sendCommand('SetCurrentProfile', { profileName: event.target.value });
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$2.warn(`<ProfileSelect> was created with unknown prop '${key}'`);
		});

		function select_change_handler() {
			currentProfile = select_value(this);
			$$invalidate(1, currentProfile);
			$$invalidate(0, profiles);
		}

		$$self.$capture_state = () => ({
			onMount,
			obs,
			sendCommand,
			profiles,
			currentProfile,
			setCurrentProfile
		});

		$$self.$inject_state = $$props => {
			if ('profiles' in $$props) $$invalidate(0, profiles = $$props.profiles);
			if ('currentProfile' in $$props) $$invalidate(1, currentProfile = $$props.currentProfile);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [profiles, currentProfile, setCurrentProfile, select_change_handler];
	}

	class ProfileSelect extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "ProfileSelect",
				options,
				id: create_fragment$2.name
			});
		}
	}

	/* src/SceneCollectionSelect.svelte generated by Svelte v4.2.12 */

	const { console: console_1$1 } = globals;
	const file$1 = "src/SceneCollectionSelect.svelte";

	function get_each_context$1(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[4] = list[i];
		return child_ctx;
	}

	// (32:2) {#each collections as collection}
	function create_each_block$1(ctx) {
		let option;
		let t_value = /*collection*/ ctx[4] + "";
		let t;
		let option_value_value;

		const block = {
			c: function create() {
				option = element("option");
				t = text(t_value);
				option.__value = option_value_value = /*collection*/ ctx[4];
				set_input_value(option, option.__value);
				add_location(option, file$1, 32, 4, 1234);
			},
			m: function mount(target, anchor) {
				insert_dev(target, option, anchor);
				append_dev(option, t);
			},
			p: function update(ctx, dirty) {
				if (dirty & /*collections*/ 1 && t_value !== (t_value = /*collection*/ ctx[4] + "")) set_data_dev(t, t_value);

				if (dirty & /*collections*/ 1 && option_value_value !== (option_value_value = /*collection*/ ctx[4])) {
					prop_dev(option, "__value", option_value_value);
					set_input_value(option, option.__value);
				}
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(option);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block$1.name,
			type: "each",
			source: "(32:2) {#each collections as collection}",
			ctx
		});

		return block;
	}

	function create_fragment$1(ctx) {
		let div;
		let select;
		let mounted;
		let dispose;
		let each_value = ensure_array_like_dev(/*collections*/ ctx[0]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
		}

		const block = {
			c: function create() {
				div = element("div");
				select = element("select");

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				attr_dev(select, "title", "Change Collection");
				if (/*currentCollection*/ ctx[1] === void 0) add_render_callback(() => /*select_change_handler*/ ctx[3].call(select));
				add_location(select, file$1, 30, 2, 1095);
				attr_dev(div, "class", "select");
				set_style(div, "margin", "0 .5rem .5rem 0");
				add_location(div, file$1, 29, 0, 1039);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, div, anchor);
				append_dev(div, select);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(select, null);
					}
				}

				select_option(select, /*currentCollection*/ ctx[1], true);

				if (!mounted) {
					dispose = [
						listen_dev(select, "change", /*select_change_handler*/ ctx[3]),
						listen_dev(select, "change", /*setCurrentCollection*/ ctx[2], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, [dirty]) {
				if (dirty & /*collections*/ 1) {
					each_value = ensure_array_like_dev(/*collections*/ ctx[0]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context$1(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
						} else {
							each_blocks[i] = create_each_block$1(child_ctx);
							each_blocks[i].c();
							each_blocks[i].m(select, null);
						}
					}

					for (; i < each_blocks.length; i += 1) {
						each_blocks[i].d(1);
					}

					each_blocks.length = each_value.length;
				}

				if (dirty & /*currentCollection, collections*/ 3) {
					select_option(select, /*currentCollection*/ ctx[1]);
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div);
				}

				destroy_each(each_blocks, detaching);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment$1.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	function instance$1($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('SceneCollectionSelect', slots, []);
		let collections = [];
		let currentCollection = '';

		onMount(async function () {
			const data = await sendCommand('GetSceneCollectionList');
			$$invalidate(0, collections = data.sceneCollections || []);
			$$invalidate(1, currentCollection = data.currentSceneCollectionName || '');
		});

		obs.on('CurrentSceneCollectionChanged', async data => {
			console.log('CurrentSceneCollectionChanged', data.sceneCollectionName);
			$$invalidate(1, currentCollection = data.sceneCollectionName || '');

			// Manually emit new scenes, since OBS doesn't send them when the collection changes
			obs.emit('SceneListChanged', await sendCommand('GetSceneList'));
		});

		obs.on('SceneCollectionListChanged', async data => {
			console.log('SceneCollectionListChanged', data.sceneCollections.length);
			$$invalidate(0, collections = data.sceneCollections || []);
		});

		async function setCurrentCollection(event) {
			sendCommand('SetCurrentSceneCollection', { sceneCollectionName: event.target.value });
		}

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1$1.warn(`<SceneCollectionSelect> was created with unknown prop '${key}'`);
		});

		function select_change_handler() {
			currentCollection = select_value(this);
			$$invalidate(1, currentCollection);
			$$invalidate(0, collections);
		}

		$$self.$capture_state = () => ({
			onMount,
			obs,
			sendCommand,
			collections,
			currentCollection,
			setCurrentCollection
		});

		$$self.$inject_state = $$props => {
			if ('collections' in $$props) $$invalidate(0, collections = $$props.collections);
			if ('currentCollection' in $$props) $$invalidate(1, currentCollection = $$props.currentCollection);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		return [collections, currentCollection, setCurrentCollection, select_change_handler];
	}

	class SceneCollectionSelect extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "SceneCollectionSelect",
				options,
				id: create_fragment$1.name
			});
		}
	}

	/* src/App.svelte generated by Svelte v4.2.12 */

	const { console: console_1, document: document_1 } = globals;
	const file = "src/App.svelte";

	function get_each_context(ctx, list, i) {
		const child_ctx = ctx.slice();
		child_ctx[35] = list[i];
		return child_ctx;
	}

	// (470:10) {:else}
	function create_else_block_6(ctx) {
		let button;
		let t_value = (/*errorMessage*/ ctx[13] || 'Disconnected') + "";
		let t;

		const block = {
			c: function create() {
				button = element("button");
				t = text(t_value);
				attr_dev(button, "class", "button is-danger");
				button.disabled = true;
				add_location(button, file, 470, 12, 14687);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, t);
			},
			p: function update(ctx, dirty) {
				if (dirty[0] & /*errorMessage*/ 8192 && t_value !== (t_value = (/*errorMessage*/ ctx[13] || 'Disconnected') + "")) set_data_dev(t, t_value);
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_6.name,
			type: "else",
			source: "(470:10) {:else}",
			ctx
		});

		return block;
	}

	// (329:10) {#if connected}
	function create_if_block_5(ctx) {
		let button0;
		let t0;
		let current_block_type_index;
		let if_block1;
		let t1;
		let current_block_type_index_1;
		let if_block2;
		let t2;
		let current_block_type_index_2;
		let if_block3;
		let t3;
		let button1;
		let span0;
		let icon0;
		let t4;
		let button2;
		let span1;
		let icon1;
		let t5;
		let button3;
		let span2;
		let icon2;
		let t6;
		let button4;
		let span3;
		let icon3;
		let t7;
		let button5;
		let span4;
		let icon4;
		let t8;
		let t9;
		let profileselect;
		let t10;
		let scenecollectionselect;
		let t11;
		let button6;
		let span5;
		let icon5;
		let current;
		let mounted;
		let dispose;

		function select_block_type_1(ctx, dirty) {
			if (/*heartbeat*/ ctx[2] && /*heartbeat*/ ctx[2].stats) return create_if_block_11;
			return create_else_block_5;
		}

		let current_block_type = select_block_type_1(ctx);
		let if_block0 = current_block_type(ctx);
		const if_block_creators = [create_if_block_10, create_else_block_4];
		const if_blocks = [];

		function select_block_type_2(ctx, dirty) {
			if (/*heartbeat*/ ctx[2] && /*heartbeat*/ ctx[2].streaming && /*heartbeat*/ ctx[2].streaming.outputActive) return 0;
			return 1;
		}

		current_block_type_index = select_block_type_2(ctx);
		if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
		const if_block_creators_1 = [create_if_block_8, create_else_block_3];
		const if_blocks_1 = [];

		function select_block_type_3(ctx, dirty) {
			if (/*heartbeat*/ ctx[2] && /*heartbeat*/ ctx[2].recording && /*heartbeat*/ ctx[2].recording.outputActive) return 0;
			return 1;
		}

		current_block_type_index_1 = select_block_type_3(ctx);
		if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
		const if_block_creators_2 = [create_if_block_7, create_else_block_1];
		const if_blocks_2 = [];

		function select_block_type_5(ctx, dirty) {
			if (/*isVirtualCamActive*/ ctx[6]) return 0;
			return 1;
		}

		current_block_type_index_2 = select_block_type_5(ctx);
		if_block3 = if_blocks_2[current_block_type_index_2] = if_block_creators_2[current_block_type_index_2](ctx);

		icon0 = new Index({
				props: { path: mdiBorderVertical },
				$$inline: true
			});

		icon1 = new Index({
				props: { path: mdiArrowSplitHorizontal },
				$$inline: true
			});

		icon2 = new Index({
				props: {
					path: /*editable*/ ctx[8] ? mdiImageEditOutline : mdiImageEdit
				},
				$$inline: true
			});

		icon3 = new Index({
				props: {
					path: /*isIconMode*/ ctx[0]
					? mdiSquareRoundedBadgeOutline
					: mdiSquareRoundedBadge
				},
				$$inline: true
			});

		icon4 = new Index({
				props: {
					path: /*isReplaying*/ ctx[7]
					? mdiMotionPlayOutline
					: mdiMotionPlay
				},
				$$inline: true
			});

		let if_block4 = /*replayError*/ ctx[12] && create_if_block_6(ctx);
		profileselect = new ProfileSelect({ $$inline: true });
		scenecollectionselect = new SceneCollectionSelect({ $$inline: true });

		icon5 = new Index({
				props: { path: mdiConnection },
				$$inline: true
			});

		const block = {
			c: function create() {
				button0 = element("button");
				if_block0.c();
				t0 = space();
				if_block1.c();
				t1 = space();
				if_block2.c();
				t2 = space();
				if_block3.c();
				t3 = space();
				button1 = element("button");
				span0 = element("span");
				create_component(icon0.$$.fragment);
				t4 = space();
				button2 = element("button");
				span1 = element("span");
				create_component(icon1.$$.fragment);
				t5 = space();
				button3 = element("button");
				span2 = element("span");
				create_component(icon2.$$.fragment);
				t6 = space();
				button4 = element("button");
				span3 = element("span");
				create_component(icon3.$$.fragment);
				t7 = space();
				button5 = element("button");
				span4 = element("span");
				create_component(icon4.$$.fragment);
				t8 = space();
				if (if_block4) if_block4.c();
				t9 = space();
				create_component(profileselect.$$.fragment);
				t10 = space();
				create_component(scenecollectionselect.$$.fragment);
				t11 = space();
				button6 = element("button");
				span5 = element("span");
				create_component(icon5.$$.fragment);
				attr_dev(button0, "class", "button is-info is-light");
				button0.disabled = true;
				add_location(button0, file, 329, 12, 9413);
				attr_dev(span0, "class", "icon");
				add_location(span0, file, 412, 14, 12646);
				attr_dev(button1, "class", "button is-link");
				attr_dev(button1, "title", "Toggle Studio Mode");
				toggle_class(button1, "is-light", !/*isStudioMode*/ ctx[4]);
				add_location(button1, file, 406, 12, 12445);
				attr_dev(span1, "class", "icon");
				add_location(span1, file, 420, 14, 12939);
				attr_dev(button2, "class", "button is-link");
				attr_dev(button2, "title", "Show Scene on Top");
				toggle_class(button2, "is-light", !/*isSceneOnTop*/ ctx[5]);
				add_location(button2, file, 414, 12, 12740);
				attr_dev(span2, "class", "icon");
				add_location(span2, file, 428, 14, 13241);
				attr_dev(button3, "class", "button is-link");
				attr_dev(button3, "title", "Edit Scenes");
				toggle_class(button3, "is-light", !/*editable*/ ctx[8]);
				add_location(button3, file, 422, 12, 13039);
				attr_dev(span3, "class", "icon");
				add_location(span3, file, 438, 14, 13612);
				attr_dev(button4, "class", "button is-link");
				attr_dev(button4, "title", "Show Scenes as Icons");
				toggle_class(button4, "is-light", !/*isIconMode*/ ctx[0]);
				add_location(button4, file, 432, 12, 13395);
				attr_dev(span4, "class", "icon");
				add_location(span4, file, 453, 14, 14102);
				attr_dev(button5, "class", "button is-link");
				attr_dev(button5, "title", "Toggle Replay Buffer");
				toggle_class(button5, "is-light", !/*isReplaying*/ ctx[7]);
				toggle_class(button5, "is-danger", /*replayError*/ ctx[12]);
				add_location(button5, file, 446, 12, 13860);
				attr_dev(span5, "class", "icon");
				add_location(span5, file, 467, 14, 14579);
				attr_dev(button6, "class", "button is-danger is-light");
				attr_dev(button6, "title", "Disconnect");
				add_location(button6, file, 462, 12, 14426);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button0, anchor);
				if_block0.m(button0, null);
				insert_dev(target, t0, anchor);
				if_blocks[current_block_type_index].m(target, anchor);
				insert_dev(target, t1, anchor);
				if_blocks_1[current_block_type_index_1].m(target, anchor);
				insert_dev(target, t2, anchor);
				if_blocks_2[current_block_type_index_2].m(target, anchor);
				insert_dev(target, t3, anchor);
				insert_dev(target, button1, anchor);
				append_dev(button1, span0);
				mount_component(icon0, span0, null);
				insert_dev(target, t4, anchor);
				insert_dev(target, button2, anchor);
				append_dev(button2, span1);
				mount_component(icon1, span1, null);
				insert_dev(target, t5, anchor);
				insert_dev(target, button3, anchor);
				append_dev(button3, span2);
				mount_component(icon2, span2, null);
				insert_dev(target, t6, anchor);
				insert_dev(target, button4, anchor);
				append_dev(button4, span3);
				mount_component(icon3, span3, null);
				insert_dev(target, t7, anchor);
				insert_dev(target, button5, anchor);
				append_dev(button5, span4);
				mount_component(icon4, span4, null);
				append_dev(button5, t8);
				if (if_block4) if_block4.m(button5, null);
				insert_dev(target, t9, anchor);
				mount_component(profileselect, target, anchor);
				insert_dev(target, t10, anchor);
				mount_component(scenecollectionselect, target, anchor);
				insert_dev(target, t11, anchor);
				insert_dev(target, button6, anchor);
				append_dev(button6, span5);
				mount_component(icon5, span5, null);
				current = true;

				if (!mounted) {
					dispose = [
						listen_dev(button1, "click", /*toggleStudioMode*/ ctx[16], false, false, false, false),
						listen_dev(button2, "click", /*switchSceneView*/ ctx[18], false, false, false, false),
						listen_dev(button3, "click", /*click_handler*/ ctx[29], false, false, false, false),
						listen_dev(button4, "click", /*click_handler_1*/ ctx[30], false, false, false, false),
						listen_dev(button5, "click", /*toggleReplay*/ ctx[17], false, false, false, false),
						listen_dev(button6, "click", /*disconnect*/ ctx[28], false, false, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				if (current_block_type === (current_block_type = select_block_type_1(ctx)) && if_block0) {
					if_block0.p(ctx, dirty);
				} else {
					if_block0.d(1);
					if_block0 = current_block_type(ctx);

					if (if_block0) {
						if_block0.c();
						if_block0.m(button0, null);
					}
				}

				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type_2(ctx);

				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block1 = if_blocks[current_block_type_index];

					if (!if_block1) {
						if_block1 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block1.c();
					} else {
						if_block1.p(ctx, dirty);
					}

					transition_in(if_block1, 1);
					if_block1.m(t1.parentNode, t1);
				}

				let previous_block_index_1 = current_block_type_index_1;
				current_block_type_index_1 = select_block_type_3(ctx);

				if (current_block_type_index_1 === previous_block_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					check_outros();
					if_block2 = if_blocks_1[current_block_type_index_1];

					if (!if_block2) {
						if_block2 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block2.c();
					} else {
						if_block2.p(ctx, dirty);
					}

					transition_in(if_block2, 1);
					if_block2.m(t2.parentNode, t2);
				}

				let previous_block_index_2 = current_block_type_index_2;
				current_block_type_index_2 = select_block_type_5(ctx);

				if (current_block_type_index_2 === previous_block_index_2) {
					if_blocks_2[current_block_type_index_2].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks_2[previous_block_index_2], 1, 1, () => {
						if_blocks_2[previous_block_index_2] = null;
					});

					check_outros();
					if_block3 = if_blocks_2[current_block_type_index_2];

					if (!if_block3) {
						if_block3 = if_blocks_2[current_block_type_index_2] = if_block_creators_2[current_block_type_index_2](ctx);
						if_block3.c();
					} else {
						if_block3.p(ctx, dirty);
					}

					transition_in(if_block3, 1);
					if_block3.m(t3.parentNode, t3);
				}

				if (!current || dirty[0] & /*isStudioMode*/ 16) {
					toggle_class(button1, "is-light", !/*isStudioMode*/ ctx[4]);
				}

				if (!current || dirty[0] & /*isSceneOnTop*/ 32) {
					toggle_class(button2, "is-light", !/*isSceneOnTop*/ ctx[5]);
				}

				const icon2_changes = {};
				if (dirty[0] & /*editable*/ 256) icon2_changes.path = /*editable*/ ctx[8] ? mdiImageEditOutline : mdiImageEdit;
				icon2.$set(icon2_changes);

				if (!current || dirty[0] & /*editable*/ 256) {
					toggle_class(button3, "is-light", !/*editable*/ ctx[8]);
				}

				const icon3_changes = {};

				if (dirty[0] & /*isIconMode*/ 1) icon3_changes.path = /*isIconMode*/ ctx[0]
				? mdiSquareRoundedBadgeOutline
				: mdiSquareRoundedBadge;

				icon3.$set(icon3_changes);

				if (!current || dirty[0] & /*isIconMode*/ 1) {
					toggle_class(button4, "is-light", !/*isIconMode*/ ctx[0]);
				}

				const icon4_changes = {};

				if (dirty[0] & /*isReplaying*/ 128) icon4_changes.path = /*isReplaying*/ ctx[7]
				? mdiMotionPlayOutline
				: mdiMotionPlay;

				icon4.$set(icon4_changes);

				if (/*replayError*/ ctx[12]) {
					if (if_block4) {
						if_block4.p(ctx, dirty);
					} else {
						if_block4 = create_if_block_6(ctx);
						if_block4.c();
						if_block4.m(button5, null);
					}
				} else if (if_block4) {
					if_block4.d(1);
					if_block4 = null;
				}

				if (!current || dirty[0] & /*isReplaying*/ 128) {
					toggle_class(button5, "is-light", !/*isReplaying*/ ctx[7]);
				}

				if (!current || dirty[0] & /*replayError*/ 4096) {
					toggle_class(button5, "is-danger", /*replayError*/ ctx[12]);
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block1);
				transition_in(if_block2);
				transition_in(if_block3);
				transition_in(icon0.$$.fragment, local);
				transition_in(icon1.$$.fragment, local);
				transition_in(icon2.$$.fragment, local);
				transition_in(icon3.$$.fragment, local);
				transition_in(icon4.$$.fragment, local);
				transition_in(profileselect.$$.fragment, local);
				transition_in(scenecollectionselect.$$.fragment, local);
				transition_in(icon5.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block1);
				transition_out(if_block2);
				transition_out(if_block3);
				transition_out(icon0.$$.fragment, local);
				transition_out(icon1.$$.fragment, local);
				transition_out(icon2.$$.fragment, local);
				transition_out(icon3.$$.fragment, local);
				transition_out(icon4.$$.fragment, local);
				transition_out(profileselect.$$.fragment, local);
				transition_out(scenecollectionselect.$$.fragment, local);
				transition_out(icon5.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button0);
					detach_dev(t0);
					detach_dev(t1);
					detach_dev(t2);
					detach_dev(t3);
					detach_dev(button1);
					detach_dev(t4);
					detach_dev(button2);
					detach_dev(t5);
					detach_dev(button3);
					detach_dev(t6);
					detach_dev(button4);
					detach_dev(t7);
					detach_dev(button5);
					detach_dev(t9);
					detach_dev(t10);
					detach_dev(t11);
					detach_dev(button6);
				}

				if_block0.d();
				if_blocks[current_block_type_index].d(detaching);
				if_blocks_1[current_block_type_index_1].d(detaching);
				if_blocks_2[current_block_type_index_2].d(detaching);
				destroy_component(icon0);
				destroy_component(icon1);
				destroy_component(icon2);
				destroy_component(icon3);
				destroy_component(icon4);
				if (if_block4) if_block4.d();
				destroy_component(profileselect, detaching);
				destroy_component(scenecollectionselect, detaching);
				destroy_component(icon5);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_5.name,
			type: "if",
			source: "(329:10) {#if connected}",
			ctx
		});

		return block;
	}

	// (335:14) {:else}
	function create_else_block_5(ctx) {
		let t;

		const block = {
			c: function create() {
				t = text("Connected");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t, anchor);
			},
			p: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_5.name,
			type: "else",
			source: "(335:14) {:else}",
			ctx
		});

		return block;
	}

	// (331:14) {#if heartbeat && heartbeat.stats}
	function create_if_block_11(ctx) {
		let t0_value = Math.round(/*heartbeat*/ ctx[2].stats.activeFps) + "";
		let t0;
		let t1;
		let t2_value = Math.round(/*heartbeat*/ ctx[2].stats.cpuUsage) + "";
		let t2;
		let t3;
		let t4_value = /*heartbeat*/ ctx[2].stats.renderSkippedFrames + "";
		let t4;
		let t5;

		const block = {
			c: function create() {
				t0 = text(t0_value);
				t1 = text(" fps, ");
				t2 = text(t2_value);
				t3 = text("% CPU, ");
				t4 = text(t4_value);
				t5 = text(" skipped frames");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t0, anchor);
				insert_dev(target, t1, anchor);
				insert_dev(target, t2, anchor);
				insert_dev(target, t3, anchor);
				insert_dev(target, t4, anchor);
				insert_dev(target, t5, anchor);
			},
			p: function update(ctx, dirty) {
				if (dirty[0] & /*heartbeat*/ 4 && t0_value !== (t0_value = Math.round(/*heartbeat*/ ctx[2].stats.activeFps) + "")) set_data_dev(t0, t0_value);
				if (dirty[0] & /*heartbeat*/ 4 && t2_value !== (t2_value = Math.round(/*heartbeat*/ ctx[2].stats.cpuUsage) + "")) set_data_dev(t2, t2_value);
				if (dirty[0] & /*heartbeat*/ 4 && t4_value !== (t4_value = /*heartbeat*/ ctx[2].stats.renderSkippedFrames + "")) set_data_dev(t4, t4_value);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t0);
					detach_dev(t1);
					detach_dev(t2);
					detach_dev(t3);
					detach_dev(t4);
					detach_dev(t5);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_11.name,
			type: "if",
			source: "(331:14) {#if heartbeat && heartbeat.stats}",
			ctx
		});

		return block;
	}

	// (346:12) {:else}
	function create_else_block_4(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiAccessPoint },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 351, 16, 10383);
				attr_dev(button, "class", "button is-danger is-light");
				attr_dev(button, "title", "Start Stream");
				add_location(button, file, 346, 14, 10217);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*startStream*/ ctx[19], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_4.name,
			type: "else",
			source: "(346:12) {:else}",
			ctx
		});

		return block;
	}

	// (337:12) {#if heartbeat && heartbeat.streaming && heartbeat.streaming.outputActive}
	function create_if_block_10(ctx) {
		let button;
		let span0;
		let icon;
		let t0;
		let span1;
		let t1_value = formatTime(/*heartbeat*/ ctx[2].streaming.outputDuration) + "";
		let t1;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiAccessPointOff },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span0 = element("span");
				create_component(icon.$$.fragment);
				t0 = space();
				span1 = element("span");
				t1 = text(t1_value);
				attr_dev(span0, "class", "icon");
				add_location(span0, file, 342, 16, 10021);
				add_location(span1, file, 343, 16, 10097);
				attr_dev(button, "class", "button is-danger");
				attr_dev(button, "title", "Stop Stream");
				add_location(button, file, 337, 14, 9866);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span0);
				mount_component(icon, span0, null);
				append_dev(button, t0);
				append_dev(button, span1);
				append_dev(span1, t1);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*stopStream*/ ctx[20], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				if ((!current || dirty[0] & /*heartbeat*/ 4) && t1_value !== (t1_value = formatTime(/*heartbeat*/ ctx[2].streaming.outputDuration) + "")) set_data_dev(t1, t1_value);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_10.name,
			type: "if",
			source: "(337:12) {#if heartbeat && heartbeat.streaming && heartbeat.streaming.outputActive}",
			ctx
		});

		return block;
	}

	// (381:12) {:else}
	function create_else_block_3(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiRecord },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 386, 16, 11736);
				attr_dev(button, "class", "button is-danger is-light");
				attr_dev(button, "title", "Start Recording");
				add_location(button, file, 381, 14, 11564);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*startRecording*/ ctx[21], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_3.name,
			type: "else",
			source: "(381:12) {:else}",
			ctx
		});

		return block;
	}

	// (355:12) {#if heartbeat && heartbeat.recording && heartbeat.recording.outputActive}
	function create_if_block_8(ctx) {
		let current_block_type_index;
		let if_block;
		let t0;
		let button;
		let span0;
		let icon;
		let t1;
		let span1;
		let t2_value = formatTime(/*heartbeat*/ ctx[2].recording.outputDuration) + "";
		let t2;
		let current;
		let mounted;
		let dispose;
		const if_block_creators = [create_if_block_9, create_else_block_2];
		const if_blocks = [];

		function select_block_type_4(ctx, dirty) {
			if (/*heartbeat*/ ctx[2].recording.outputPaused) return 0;
			return 1;
		}

		current_block_type_index = select_block_type_4(ctx);
		if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
		icon = new Index({ props: { path: mdiStop }, $$inline: true });

		const block = {
			c: function create() {
				if_block.c();
				t0 = space();
				button = element("button");
				span0 = element("span");
				create_component(icon.$$.fragment);
				t1 = space();
				span1 = element("span");
				t2 = text(t2_value);
				attr_dev(span0, "class", "icon");
				add_location(span0, file, 377, 16, 11378);
				add_location(span1, file, 378, 16, 11444);
				attr_dev(button, "class", "button is-danger");
				attr_dev(button, "title", "Stop Recording");
				add_location(button, file, 372, 14, 11217);
			},
			m: function mount(target, anchor) {
				if_blocks[current_block_type_index].m(target, anchor);
				insert_dev(target, t0, anchor);
				insert_dev(target, button, anchor);
				append_dev(button, span0);
				mount_component(icon, span0, null);
				append_dev(button, t1);
				append_dev(button, span1);
				append_dev(span1, t2);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*stopRecording*/ ctx[22], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type_4(ctx);

				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block = if_blocks[current_block_type_index];

					if (!if_block) {
						if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block.c();
					} else {
						if_block.p(ctx, dirty);
					}

					transition_in(if_block, 1);
					if_block.m(t0.parentNode, t0);
				}

				if ((!current || dirty[0] & /*heartbeat*/ 4) && t2_value !== (t2_value = formatTime(/*heartbeat*/ ctx[2].recording.outputDuration) + "")) set_data_dev(t2, t2_value);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block);
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block);
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t0);
					detach_dev(button);
				}

				if_blocks[current_block_type_index].d(detaching);
				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_8.name,
			type: "if",
			source: "(355:12) {#if heartbeat && heartbeat.recording && heartbeat.recording.outputActive}",
			ctx
		});

		return block;
	}

	// (364:14) {:else}
	function create_else_block_2(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiPause },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 369, 18, 11106);
				attr_dev(button, "class", "button is-success");
				attr_dev(button, "title", "Pause Recording");
				add_location(button, file, 364, 16, 10932);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*pauseRecording*/ ctx[25], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_2.name,
			type: "else",
			source: "(364:14) {:else}",
			ctx
		});

		return block;
	}

	// (356:14) {#if heartbeat.recording.outputPaused}
	function create_if_block_9(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiPlayPause },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 361, 18, 10813);
				attr_dev(button, "class", "button is-danger");
				attr_dev(button, "title", "Resume Recording");
				add_location(button, file, 356, 16, 10638);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*resumeRecording*/ ctx[26], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_9.name,
			type: "if",
			source: "(356:14) {#if heartbeat.recording.outputPaused}",
			ctx
		});

		return block;
	}

	// (398:12) {:else}
	function create_else_block_1(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiCamera },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 403, 16, 12339);
				attr_dev(button, "class", "button is-danger is-light");
				attr_dev(button, "title", "Start Virtual Webcam");
				add_location(button, file, 398, 14, 12161);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*startVirtualCam*/ ctx[23], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block_1.name,
			type: "else",
			source: "(398:12) {:else}",
			ctx
		});

		return block;
	}

	// (390:12) {#if isVirtualCamActive}
	function create_if_block_7(ctx) {
		let button;
		let span;
		let icon;
		let current;
		let mounted;
		let dispose;

		icon = new Index({
				props: { path: mdiCameraOff },
				$$inline: true
			});

		const block = {
			c: function create() {
				button = element("button");
				span = element("span");
				create_component(icon.$$.fragment);
				attr_dev(span, "class", "icon");
				add_location(span, file, 395, 16, 12048);
				attr_dev(button, "class", "button is-danger");
				attr_dev(button, "title", "Stop Virtual Webcam");
				add_location(button, file, 390, 14, 11881);
			},
			m: function mount(target, anchor) {
				insert_dev(target, button, anchor);
				append_dev(button, span);
				mount_component(icon, span, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button, "click", /*stopVirtualCam*/ ctx[24], false, false, false, false);
					mounted = true;
				}
			},
			p: noop$1,
			i: function intro(local) {
				if (current) return;
				transition_in(icon.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(icon.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(button);
				}

				destroy_component(icon);
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_7.name,
			type: "if",
			source: "(390:12) {#if isVirtualCamActive}",
			ctx
		});

		return block;
	}

	// (459:14) {#if replayError}
	function create_if_block_6(ctx) {
		let span;
		let t;

		const block = {
			c: function create() {
				span = element("span");
				t = text(/*replayError*/ ctx[12]);
				add_location(span, file, 458, 31, 14292);
			},
			m: function mount(target, anchor) {
				insert_dev(target, span, anchor);
				append_dev(span, t);
			},
			p: function update(ctx, dirty) {
				if (dirty[0] & /*replayError*/ 4096) set_data_dev(t, /*replayError*/ ctx[12]);
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(span);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_6.name,
			type: "if",
			source: "(459:14) {#if replayError}",
			ctx
		});

		return block;
	}

	// (515:4) {:else}
	function create_else_block(ctx) {
		let h1;
		let t1;
		let t2;
		let p0;
		let t4;
		let form;
		let div;
		let p1;
		let input0;
		let t5;
		let input1;
		let t6;
		let p2;
		let button;
		let mounted;
		let dispose;
		let if_block = document.location.protocol === 'https:' && create_if_block_4(ctx);

		const block = {
			c: function create() {
				h1 = element("h1");
				h1.textContent = "Welcome!";
				t1 = space();
				if (if_block) if_block.c();
				t2 = space();
				p0 = element("p");
				p0.textContent = "Please enter your OBS IP and password";
				t4 = space();
				form = element("form");
				div = element("div");
				p1 = element("p");
				input0 = element("input");
				t5 = space();
				input1 = element("input");
				t6 = space();
				p2 = element("p");
				button = element("button");
				button.textContent = "Connect";
				attr_dev(h1, "class", "subtitle");
				add_location(h1, file, 515, 6, 15880);
				add_location(p0, file, 542, 6, 16818);
				attr_dev(input0, "id", "host");
				attr_dev(input0, "class", "input");
				attr_dev(input0, "type", "text");
				attr_dev(input0, "autocomplete", "");
				attr_dev(input0, "placeholder", "ws://localhost:4455");
				add_location(input0, file, 547, 12, 17005);
				attr_dev(input1, "id", "password");
				attr_dev(input1, "class", "input");
				attr_dev(input1, "type", "password");
				attr_dev(input1, "autocomplete", "current-password");
				attr_dev(input1, "placeholder", "password");
				add_location(input1, file, 555, 12, 17230);
				attr_dev(p1, "class", "control is-expanded");
				add_location(p1, file, 546, 10, 16961);
				attr_dev(button, "class", "button is-link");
				add_location(button, file, 565, 12, 17514);
				attr_dev(p2, "class", "control");
				add_location(p2, file, 564, 10, 17482);
				attr_dev(div, "class", "field is-grouped");
				add_location(div, file, 545, 8, 16920);
				add_location(form, file, 544, 6, 16870);
			},
			m: function mount(target, anchor) {
				insert_dev(target, h1, anchor);
				insert_dev(target, t1, anchor);
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, t2, anchor);
				insert_dev(target, p0, anchor);
				insert_dev(target, t4, anchor);
				insert_dev(target, form, anchor);
				append_dev(form, div);
				append_dev(div, p1);
				append_dev(p1, input0);
				set_input_value(input0, /*address*/ ctx[9]);
				append_dev(p1, t5);
				append_dev(p1, input1);
				set_input_value(input1, /*password*/ ctx[10]);
				append_dev(div, t6);
				append_dev(div, p2);
				append_dev(p2, button);

				if (!mounted) {
					dispose = [
						listen_dev(input0, "input", /*input0_input_handler*/ ctx[32]),
						listen_dev(input1, "input", /*input1_input_handler*/ ctx[33]),
						listen_dev(form, "submit", prevent_default(/*connect*/ ctx[27]), false, true, false, false)
					];

					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				if (document.location.protocol === 'https:') if_block.p(ctx, dirty);

				if (dirty[0] & /*address*/ 512 && input0.value !== /*address*/ ctx[9]) {
					set_input_value(input0, /*address*/ ctx[9]);
				}

				if (dirty[0] & /*password*/ 1024 && input1.value !== /*password*/ ctx[10]) {
					set_input_value(input1, /*password*/ ctx[10]);
				}
			},
			i: noop$1,
			o: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(h1);
					detach_dev(t1);
					detach_dev(t2);
					detach_dev(p0);
					detach_dev(t4);
					detach_dev(form);
				}

				if (if_block) if_block.d(detaching);
				mounted = false;
				run_all(dispose);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_else_block.name,
			type: "else",
			source: "(515:4) {:else}",
			ctx
		});

		return block;
	}

	// (494:4) {#if connected}
	function create_if_block(ctx) {
		let t0;
		let sceneswitcher;
		let updating_scenes;
		let t1;
		let t2;
		let each_1_anchor;
		let current;
		let if_block0 = /*isSceneOnTop*/ ctx[5] && create_if_block_3(ctx);

		function sceneswitcher_scenes_binding(value) {
			/*sceneswitcher_scenes_binding*/ ctx[31](value);
		}

		let sceneswitcher_props = {
			buttonStyle: /*isIconMode*/ ctx[0] ? 'icon' : 'text',
			editable: /*editable*/ ctx[8]
		};

		if (/*scenes*/ ctx[11] !== void 0) {
			sceneswitcher_props.scenes = /*scenes*/ ctx[11];
		}

		sceneswitcher = new SceneSwitcher({
				props: sceneswitcher_props,
				$$inline: true
			});

		binding_callbacks.push(() => bind(sceneswitcher, 'scenes', sceneswitcher_scenes_binding));
		let if_block1 = !/*isSceneOnTop*/ ctx[5] && create_if_block_2(ctx);
		let each_value = ensure_array_like_dev(/*scenes*/ ctx[11]);
		let each_blocks = [];

		for (let i = 0; i < each_value.length; i += 1) {
			each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
		}

		const out = i => transition_out(each_blocks[i], 1, 1, () => {
			each_blocks[i] = null;
		});

		const block = {
			c: function create() {
				if (if_block0) if_block0.c();
				t0 = space();
				create_component(sceneswitcher.$$.fragment);
				t1 = space();
				if (if_block1) if_block1.c();
				t2 = space();

				for (let i = 0; i < each_blocks.length; i += 1) {
					each_blocks[i].c();
				}

				each_1_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (if_block0) if_block0.m(target, anchor);
				insert_dev(target, t0, anchor);
				mount_component(sceneswitcher, target, anchor);
				insert_dev(target, t1, anchor);
				if (if_block1) if_block1.m(target, anchor);
				insert_dev(target, t2, anchor);

				for (let i = 0; i < each_blocks.length; i += 1) {
					if (each_blocks[i]) {
						each_blocks[i].m(target, anchor);
					}
				}

				insert_dev(target, each_1_anchor, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				if (/*isSceneOnTop*/ ctx[5]) {
					if (if_block0) {
						if_block0.p(ctx, dirty);

						if (dirty[0] & /*isSceneOnTop*/ 32) {
							transition_in(if_block0, 1);
						}
					} else {
						if_block0 = create_if_block_3(ctx);
						if_block0.c();
						transition_in(if_block0, 1);
						if_block0.m(t0.parentNode, t0);
					}
				} else if (if_block0) {
					group_outros();

					transition_out(if_block0, 1, 1, () => {
						if_block0 = null;
					});

					check_outros();
				}

				const sceneswitcher_changes = {};
				if (dirty[0] & /*isIconMode*/ 1) sceneswitcher_changes.buttonStyle = /*isIconMode*/ ctx[0] ? 'icon' : 'text';
				if (dirty[0] & /*editable*/ 256) sceneswitcher_changes.editable = /*editable*/ ctx[8];

				if (!updating_scenes && dirty[0] & /*scenes*/ 2048) {
					updating_scenes = true;
					sceneswitcher_changes.scenes = /*scenes*/ ctx[11];
					add_flush_callback(() => updating_scenes = false);
				}

				sceneswitcher.$set(sceneswitcher_changes);

				if (!/*isSceneOnTop*/ ctx[5]) {
					if (if_block1) {
						if_block1.p(ctx, dirty);

						if (dirty[0] & /*isSceneOnTop*/ 32) {
							transition_in(if_block1, 1);
						}
					} else {
						if_block1 = create_if_block_2(ctx);
						if_block1.c();
						transition_in(if_block1, 1);
						if_block1.m(t2.parentNode, t2);
					}
				} else if (if_block1) {
					group_outros();

					transition_out(if_block1, 1, 1, () => {
						if_block1 = null;
					});

					check_outros();
				}

				if (dirty[0] & /*scenes, imageFormat*/ 18432) {
					each_value = ensure_array_like_dev(/*scenes*/ ctx[11]);
					let i;

					for (i = 0; i < each_value.length; i += 1) {
						const child_ctx = get_each_context(ctx, each_value, i);

						if (each_blocks[i]) {
							each_blocks[i].p(child_ctx, dirty);
							transition_in(each_blocks[i], 1);
						} else {
							each_blocks[i] = create_each_block(child_ctx);
							each_blocks[i].c();
							transition_in(each_blocks[i], 1);
							each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
						}
					}

					group_outros();

					for (i = each_value.length; i < each_blocks.length; i += 1) {
						out(i);
					}

					check_outros();
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block0);
				transition_in(sceneswitcher.$$.fragment, local);
				transition_in(if_block1);

				for (let i = 0; i < each_value.length; i += 1) {
					transition_in(each_blocks[i]);
				}

				current = true;
			},
			o: function outro(local) {
				transition_out(if_block0);
				transition_out(sceneswitcher.$$.fragment, local);
				transition_out(if_block1);
				each_blocks = each_blocks.filter(Boolean);

				for (let i = 0; i < each_blocks.length; i += 1) {
					transition_out(each_blocks[i]);
				}

				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t0);
					detach_dev(t1);
					detach_dev(t2);
					detach_dev(each_1_anchor);
				}

				if (if_block0) if_block0.d(detaching);
				destroy_component(sceneswitcher, detaching);
				if (if_block1) if_block1.d(detaching);
				destroy_each(each_blocks, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block.name,
			type: "if",
			source: "(494:4) {#if connected}",
			ctx
		});

		return block;
	}

	// (520:6) {#if document.location.protocol === 'https:'}
	function create_if_block_4(ctx) {
		let div;
		let t0;
		let strong0;
		let t2;
		let a0;
		let t4;
		let a1;
		let t6;
		let strong1;
		let a2;
		let t7;
		let t8;

		const block = {
			c: function create() {
				div = element("div");
				t0 = text("You are checking this page on a secure HTTPS connection. That's great,\n          but it means you can\n          ");
				strong0 = element("strong");
				strong0.textContent = "only";
				t2 = text("\n          connect to WSS (secure websocket) addresses, for example OBS exposed with\n          ");
				a0 = element("a");
				a0.textContent = "ngrok";
				t4 = text("\n          or\n          ");
				a1 = element("a");
				a1.textContent = "pagekite";
				t6 = text("\n          . If you want to connect to a local OBS instance,\n          ");
				strong1 = element("strong");
				a2 = element("a");
				t7 = text("please click here to load the non-secure version of this page");
				t8 = text("\n          .");
				add_location(strong0, file, 523, 10, 16151);
				attr_dev(a0, "href", "https://ngrok.com/");
				add_location(a0, file, 525, 10, 16267);
				attr_dev(a1, "href", "https://pagekite.net/");
				add_location(a1, file, 527, 10, 16329);

				attr_dev(a2, "href", "http://" + document.location.hostname + (document.location.port
				? ':' + document.location.port
				: '') + document.location.pathname);

				add_location(a2, file, 530, 12, 16465);
				add_location(strong1, file, 529, 10, 16444);
				attr_dev(div, "class", "notification is-danger");
				add_location(div, file, 520, 8, 15992);
			},
			m: function mount(target, anchor) {
				insert_dev(target, div, anchor);
				append_dev(div, t0);
				append_dev(div, strong0);
				append_dev(div, t2);
				append_dev(div, a0);
				append_dev(div, t4);
				append_dev(div, a1);
				append_dev(div, t6);
				append_dev(div, strong1);
				append_dev(strong1, a2);
				append_dev(a2, t7);
				append_dev(div, t8);
			},
			p: noop$1,
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(div);
				}
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_4.name,
			type: "if",
			source: "(520:6) {#if document.location.protocol === 'https:'}",
			ctx
		});

		return block;
	}

	// (495:6) {#if isSceneOnTop}
	function create_if_block_3(ctx) {
		let programpreview;
		let current;

		programpreview = new ProgramPreview({
				props: { imageFormat: /*imageFormat*/ ctx[14] },
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(programpreview.$$.fragment);
			},
			m: function mount(target, anchor) {
				mount_component(programpreview, target, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				const programpreview_changes = {};
				if (dirty[0] & /*imageFormat*/ 16384) programpreview_changes.imageFormat = /*imageFormat*/ ctx[14];
				programpreview.$set(programpreview_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(programpreview.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(programpreview.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(programpreview, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_3.name,
			type: "if",
			source: "(495:6) {#if isSceneOnTop}",
			ctx
		});

		return block;
	}

	// (503:6) {#if !isSceneOnTop}
	function create_if_block_2(ctx) {
		let programpreview;
		let current;

		programpreview = new ProgramPreview({
				props: { imageFormat: /*imageFormat*/ ctx[14] },
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(programpreview.$$.fragment);
			},
			m: function mount(target, anchor) {
				mount_component(programpreview, target, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				const programpreview_changes = {};
				if (dirty[0] & /*imageFormat*/ 16384) programpreview_changes.imageFormat = /*imageFormat*/ ctx[14];
				programpreview.$set(programpreview_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(programpreview.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(programpreview.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(programpreview, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_2.name,
			type: "if",
			source: "(503:6) {#if !isSceneOnTop}",
			ctx
		});

		return block;
	}

	// (507:8) {#if scene.sceneName.indexOf('(switch)') > 0}
	function create_if_block_1(ctx) {
		let sourceswitcher;
		let current;

		sourceswitcher = new SourceSwitcher({
				props: {
					name: /*scene*/ ctx[35].sceneName,
					imageFormat: /*imageFormat*/ ctx[14],
					buttonStyle: "screenshot"
				},
				$$inline: true
			});

		const block = {
			c: function create() {
				create_component(sourceswitcher.$$.fragment);
			},
			m: function mount(target, anchor) {
				mount_component(sourceswitcher, target, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				const sourceswitcher_changes = {};
				if (dirty[0] & /*scenes*/ 2048) sourceswitcher_changes.name = /*scene*/ ctx[35].sceneName;
				if (dirty[0] & /*imageFormat*/ 16384) sourceswitcher_changes.imageFormat = /*imageFormat*/ ctx[14];
				sourceswitcher.$set(sourceswitcher_changes);
			},
			i: function intro(local) {
				if (current) return;
				transition_in(sourceswitcher.$$.fragment, local);
				current = true;
			},
			o: function outro(local) {
				transition_out(sourceswitcher.$$.fragment, local);
				current = false;
			},
			d: function destroy(detaching) {
				destroy_component(sourceswitcher, detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_if_block_1.name,
			type: "if",
			source: "(507:8) {#if scene.sceneName.indexOf('(switch)') > 0}",
			ctx
		});

		return block;
	}

	// (506:6) {#each scenes as scene}
	function create_each_block(ctx) {
		let show_if = /*scene*/ ctx[35].sceneName.indexOf('(switch)') > 0;
		let if_block_anchor;
		let current;
		let if_block = show_if && create_if_block_1(ctx);

		const block = {
			c: function create() {
				if (if_block) if_block.c();
				if_block_anchor = empty();
			},
			m: function mount(target, anchor) {
				if (if_block) if_block.m(target, anchor);
				insert_dev(target, if_block_anchor, anchor);
				current = true;
			},
			p: function update(ctx, dirty) {
				if (dirty[0] & /*scenes*/ 2048) show_if = /*scene*/ ctx[35].sceneName.indexOf('(switch)') > 0;

				if (show_if) {
					if (if_block) {
						if_block.p(ctx, dirty);

						if (dirty[0] & /*scenes*/ 2048) {
							transition_in(if_block, 1);
						}
					} else {
						if_block = create_if_block_1(ctx);
						if_block.c();
						transition_in(if_block, 1);
						if_block.m(if_block_anchor.parentNode, if_block_anchor);
					}
				} else if (if_block) {
					group_outros();

					transition_out(if_block, 1, 1, () => {
						if_block = null;
					});

					check_outros();
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(if_block_anchor);
				}

				if (if_block) if_block.d(detaching);
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_each_block.name,
			type: "each",
			source: "(506:6) {#each scenes as scene}",
			ctx
		});

		return block;
	}

	function create_fragment(ctx) {
		let t0;
		let nav;
		let div0;
		let button0;
		let span0;
		let t1;
		let span1;
		let t2;
		let span2;
		let t3;
		let div4;
		let div3;
		let div2;
		let div1;
		let current_block_type_index;
		let if_block0;
		let t4;
		let button1;
		let span3;
		let icon;
		let t5;
		let section;
		let div5;
		let current_block_type_index_1;
		let if_block1;
		let current;
		let mounted;
		let dispose;
		const if_block_creators = [create_if_block_5, create_else_block_6];
		const if_blocks = [];

		function select_block_type(ctx, dirty) {
			if (/*connected*/ ctx[1]) return 0;
			return 1;
		}

		current_block_type_index = select_block_type(ctx);
		if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);

		icon = new Index({
				props: {
					path: /*isFullScreen*/ ctx[3]
					? mdiFullscreenExit
					: mdiFullscreen
				},
				$$inline: true
			});

		const if_block_creators_1 = [create_if_block, create_else_block];
		const if_blocks_1 = [];

		function select_block_type_6(ctx, dirty) {
			if (/*connected*/ ctx[1]) return 0;
			return 1;
		}

		current_block_type_index_1 = select_block_type_6(ctx);
		if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);

		const block = {
			c: function create() {
				t0 = space();
				nav = element("nav");
				div0 = element("div");
				button0 = element("button");
				span0 = element("span");
				t1 = space();
				span1 = element("span");
				t2 = space();
				span2 = element("span");
				t3 = space();
				div4 = element("div");
				div3 = element("div");
				div2 = element("div");
				div1 = element("div");
				if_block0.c();
				t4 = space();
				button1 = element("button");
				span3 = element("span");
				create_component(icon.$$.fragment);
				t5 = space();
				section = element("section");
				div5 = element("div");
				if_block1.c();
				document_1.title = "OBS-web remote control";
				attr_dev(span0, "aria-hidden", "true");
				add_location(span0, file, 317, 6, 9067);
				attr_dev(span1, "aria-hidden", "true");
				add_location(span1, file, 318, 6, 9101);
				attr_dev(span2, "aria-hidden", "true");
				add_location(span2, file, 319, 6, 9135);
				attr_dev(button0, "class", "navbar-burger burger");
				attr_dev(button0, "aria-label", "menu");
				attr_dev(button0, "aria-expanded", "false");
				attr_dev(button0, "data-target", "navmenu");
				add_location(button0, file, 311, 4, 8932);
				attr_dev(div0, "class", "navbar-brand");
				add_location(div0, file, 307, 2, 8846);
				attr_dev(span3, "class", "icon");
				add_location(span3, file, 481, 12, 15069);
				attr_dev(button1, "class", "button is-link");
				attr_dev(button1, "title", "Toggle Fullscreen");
				toggle_class(button1, "is-light", !/*isFullScreen*/ ctx[3]);
				add_location(button1, file, 475, 10, 14881);
				attr_dev(div1, "class", "buttons");
				add_location(div1, file, 326, 8, 9297);
				attr_dev(div2, "class", "navbar-item");
				add_location(div2, file, 325, 6, 9263);
				attr_dev(div3, "class", "navbar-end");
				add_location(div3, file, 324, 4, 9232);
				attr_dev(div4, "id", "navmenu");
				attr_dev(div4, "class", "navbar-menu");
				add_location(div4, file, 323, 2, 9189);
				attr_dev(nav, "class", "navbar is-info");
				add_location(nav, file, 306, 1, 8814);
				attr_dev(div5, "class", "container");
				add_location(div5, file, 492, 2, 15292);
				attr_dev(section, "class", "section");
				add_location(section, file, 491, 0, 15264);
			},
			l: function claim(nodes) {
				throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
			},
			m: function mount(target, anchor) {
				insert_dev(target, t0, anchor);
				insert_dev(target, nav, anchor);
				append_dev(nav, div0);
				append_dev(div0, button0);
				append_dev(button0, span0);
				append_dev(button0, t1);
				append_dev(button0, span1);
				append_dev(button0, t2);
				append_dev(button0, span2);
				append_dev(nav, t3);
				append_dev(nav, div4);
				append_dev(div4, div3);
				append_dev(div3, div2);
				append_dev(div2, div1);
				if_blocks[current_block_type_index].m(div1, null);
				append_dev(div1, t4);
				append_dev(div1, button1);
				append_dev(button1, span3);
				mount_component(icon, span3, null);
				insert_dev(target, t5, anchor);
				insert_dev(target, section, anchor);
				append_dev(section, div5);
				if_blocks_1[current_block_type_index_1].m(div5, null);
				current = true;

				if (!mounted) {
					dispose = listen_dev(button1, "click", /*toggleFullScreen*/ ctx[15], false, false, false, false);
					mounted = true;
				}
			},
			p: function update(ctx, dirty) {
				let previous_block_index = current_block_type_index;
				current_block_type_index = select_block_type(ctx);

				if (current_block_type_index === previous_block_index) {
					if_blocks[current_block_type_index].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks[previous_block_index], 1, 1, () => {
						if_blocks[previous_block_index] = null;
					});

					check_outros();
					if_block0 = if_blocks[current_block_type_index];

					if (!if_block0) {
						if_block0 = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
						if_block0.c();
					} else {
						if_block0.p(ctx, dirty);
					}

					transition_in(if_block0, 1);
					if_block0.m(div1, t4);
				}

				const icon_changes = {};

				if (dirty[0] & /*isFullScreen*/ 8) icon_changes.path = /*isFullScreen*/ ctx[3]
				? mdiFullscreenExit
				: mdiFullscreen;

				icon.$set(icon_changes);

				if (!current || dirty[0] & /*isFullScreen*/ 8) {
					toggle_class(button1, "is-light", !/*isFullScreen*/ ctx[3]);
				}

				let previous_block_index_1 = current_block_type_index_1;
				current_block_type_index_1 = select_block_type_6(ctx);

				if (current_block_type_index_1 === previous_block_index_1) {
					if_blocks_1[current_block_type_index_1].p(ctx, dirty);
				} else {
					group_outros();

					transition_out(if_blocks_1[previous_block_index_1], 1, 1, () => {
						if_blocks_1[previous_block_index_1] = null;
					});

					check_outros();
					if_block1 = if_blocks_1[current_block_type_index_1];

					if (!if_block1) {
						if_block1 = if_blocks_1[current_block_type_index_1] = if_block_creators_1[current_block_type_index_1](ctx);
						if_block1.c();
					} else {
						if_block1.p(ctx, dirty);
					}

					transition_in(if_block1, 1);
					if_block1.m(div5, null);
				}
			},
			i: function intro(local) {
				if (current) return;
				transition_in(if_block0);
				transition_in(icon.$$.fragment, local);
				transition_in(if_block1);
				current = true;
			},
			o: function outro(local) {
				transition_out(if_block0);
				transition_out(icon.$$.fragment, local);
				transition_out(if_block1);
				current = false;
			},
			d: function destroy(detaching) {
				if (detaching) {
					detach_dev(t0);
					detach_dev(nav);
					detach_dev(t5);
					detach_dev(section);
				}

				if_blocks[current_block_type_index].d();
				destroy_component(icon);
				if_blocks_1[current_block_type_index_1].d();
				mounted = false;
				dispose();
			}
		};

		dispatch_dev("SvelteRegisterBlock", {
			block,
			id: create_fragment.name,
			type: "component",
			source: "",
			ctx
		});

		return block;
	}

	const OBS_WEBSOCKET_LATEST_VERSION = '5.0.1'; // https://api.github.com/repos/Palakis/obs-websocket/releases/latest

	function formatTime(secs) {
		secs = Math.round(secs / 1000);
		const hours = Math.floor(secs / 3600);
		secs -= hours * 3600;
		const mins = Math.floor(secs / 60);
		secs -= mins * 60;

		return hours > 0
		? `${hours}:${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`
		: `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
	}

	function instance($$self, $$props, $$invalidate) {
		let { $$slots: slots = {}, $$scope } = $$props;
		validate_slots('App', slots, []);

		onMount(async () => {
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('/service-worker.js');
			}

			// Request screen wakelock
			if ('wakeLock' in navigator) {
				try {
					await navigator.wakeLock.request('screen');

					// Re-request when coming back
					document.addEventListener('visibilitychange', async () => {
						if (document.visibilityState === 'visible') {
							await navigator.wakeLock.request('screen');
						}
					});
				} catch(e) {
					
				}
			}

			// Toggle the navigation hamburger menu on mobile
			const navbar = document.querySelector('.navbar-burger');

			navbar.addEventListener('click', () => {
				navbar.classList.toggle('is-active');
				document.getElementById(navbar.dataset.target).classList.toggle('is-active');
			});

			// Listen for fullscreen changes
			document.addEventListener('fullscreenchange', () => {
				$$invalidate(3, isFullScreen = document.fullscreenElement);
			});

			document.addEventListener('webkitfullscreenchange', () => {
				$$invalidate(3, isFullScreen = document.webkitFullscreenElement);
			});

			document.addEventListener('msfullscreenchange', () => {
				$$invalidate(3, isFullScreen = document.msFullscreenElement);
			});

			if (document.location.hash !== '') {
				// Read address from hash
				$$invalidate(9, address = document.location.hash.slice(1));

				// This allows you to add a password in the URL like this:
				// http://obs-web.niek.tv/#ws://localhost:4455#password
				if (address.includes('#')) {
					$$invalidate(9, [address, password] = address.split('#'), address, $$invalidate(10, password));
				}

				await connect();
			}

			// Export the sendCommand() function to the window object
			window.sendCommand = sendCommand;
		});

		// State
		let connected;

		let heartbeat = {};
		let heartbeatInterval;
		let isFullScreen;
		let isStudioMode;
		let isSceneOnTop;
		let isVirtualCamActive;
		let isIconMode = window.localStorage.getItem('isIconMode') || false;
		let isReplaying;
		let editable = false;
		let address;
		let password;
		let scenes = [];
		let replayError = '';
		let errorMessage = '';
		let imageFormat = 'jpg';

		function toggleFullScreen() {
			if (isFullScreen) {
				if (document.exitFullscreen) {
					document.exitFullscreen();
				} else if (document.webkitExitFullscreen) {
					document.webkitExitFullscreen();
				} else if (document.msExitFullscreen) {
					document.msExitFullscreen();
				}
			} else {
				if (document.documentElement.requestFullscreen) {
					document.documentElement.requestFullscreen();
				} else if (document.documentElement.webkitRequestFullscreen) {
					document.documentElement.webkitRequestFullscreen();
				} else if (document.documentElement.msRequestFullscreen) {
					document.documentElement.msRequestFullscreen();
				}
			}
		}

		async function toggleStudioMode() {
			await sendCommand('SetStudioModeEnabled', { studioModeEnabled: !isStudioMode });
		}

		async function toggleReplay() {
			const data = await sendCommand('ToggleReplayBuffer');
			console.debug('ToggleReplayBuffer', data.outputActive);

			if (data.outputActive === undefined) {
				$$invalidate(12, replayError = 'Replay buffer is not enabled.');

				setTimeout(
					function () {
						$$invalidate(12, replayError = '');
					},
					5000
				);
			} else $$invalidate(7, isReplaying = data.outputActive);
		}

		async function switchSceneView() {
			$$invalidate(5, isSceneOnTop = !isSceneOnTop);
		}

		async function startStream() {
			await sendCommand('StartStream');
		}

		async function stopStream() {
			await sendCommand('StopStream');
		}

		async function startRecording() {
			await sendCommand('StartRecord');
		}

		async function stopRecording() {
			await sendCommand('StopRecord');
		}

		async function startVirtualCam() {
			await sendCommand('StartVirtualCam');
		}

		async function stopVirtualCam() {
			await sendCommand('StopVirtualCam');
		}

		async function pauseRecording() {
			await sendCommand('PauseRecord');
		}

		async function resumeRecording() {
			await sendCommand('ResumeRecord');
		}

		async function connect() {
			$$invalidate(9, address = address || 'ws://localhost:4455');

			if (address.indexOf('://') === -1) {
				const secure = location.protocol === 'https:' || address.endsWith(':443');
				$$invalidate(9, address = secure ? 'wss://' : 'ws://' + address);
			}

			console.log('Connecting to:', address, '- using password:', password);
			await disconnect();

			try {
				const { obsWebSocketVersion, negotiatedRpcVersion } = await obs.connect(address, password);
				console.log(`Connected to obs-websocket version ${obsWebSocketVersion} (using RPC ${negotiatedRpcVersion})`);
			} catch(e) {
				console.log(e);
				$$invalidate(13, errorMessage = e.message);
			}
		}

		async function disconnect() {
			await obs.disconnect();
			clearInterval(heartbeatInterval);
			$$invalidate(1, connected = false);
			$$invalidate(13, errorMessage = 'Disconnected');
		}

		// OBS events
		obs.on('ConnectionClosed', () => {
			$$invalidate(1, connected = false);
			window.history.pushState('', document.title, window.location.pathname + window.location.search); // Remove the hash
			console.log('Connection closed');
		});

		obs.on('Identified', async () => {
			console.log('Connected');
			$$invalidate(1, connected = true);
			document.location.hash = address; // For easy bookmarking
			const data = await sendCommand('GetVersion');
			const version = data.obsWebSocketVersion || '';
			console.log('OBS-websocket version:', version);

			if (compareVersions(version, OBS_WEBSOCKET_LATEST_VERSION) < 0) {
				alert('You are running an outdated OBS-websocket (version ' + version + '), please upgrade to the latest version for full compatibility.');
			}

			if (data.supportedImageFormats.includes('webp') && document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0) {
				$$invalidate(14, imageFormat = 'webp');
			}

			heartbeatInterval = setInterval(
				async () => {
					const stats = await sendCommand('GetStats');
					const streaming = await sendCommand('GetStreamStatus');
					const recording = await sendCommand('GetRecordStatus');
					$$invalidate(2, heartbeat = { stats, streaming, recording });
				}, // console.log(heartbeat);
				1000 // Heartbeat
			);

			$$invalidate(4, isStudioMode = (await sendCommand('GetStudioModeEnabled')).studioModeEnabled || false);
			$$invalidate(6, isVirtualCamActive = (await sendCommand('GetVirtualCamStatus')).outputActive || false);
		});

		obs.on('ConnectionError', async () => {
			$$invalidate(13, errorMessage = 'Please enter your password:');
			document.getElementById('password').focus();

			if (!password) {
				$$invalidate(1, connected = false);
			} else {
				await connect();
			}
		});

		obs.on('VirtualcamStateChanged', async data => {
			console.log('VirtualcamStateChanged', data.outputActive);
			$$invalidate(6, isVirtualCamActive = data && data.outputActive);
		});

		obs.on('StudioModeStateChanged', async data => {
			console.log('StudioModeStateChanged', data.studioModeEnabled);
			$$invalidate(4, isStudioMode = data && data.studioModeEnabled);
		});

		obs.on('ReplayBufferStateChanged', async data => {
			console.log('ReplayBufferStateChanged', data);
			$$invalidate(7, isReplaying = data && data.outputActive);
		});

		const writable_props = [];

		Object.keys($$props).forEach(key => {
			if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console_1.warn(`<App> was created with unknown prop '${key}'`);
		});

		const click_handler = () => $$invalidate(8, editable = !editable);
		const click_handler_1 = () => $$invalidate(0, isIconMode = !isIconMode);

		function sceneswitcher_scenes_binding(value) {
			scenes = value;
			$$invalidate(11, scenes);
		}

		function input0_input_handler() {
			address = this.value;
			$$invalidate(9, address);
		}

		function input1_input_handler() {
			password = this.value;
			$$invalidate(10, password);
		}

		$$self.$capture_state = () => ({
			OBS_WEBSOCKET_LATEST_VERSION,
			onMount,
			mdiSquareRoundedBadge,
			mdiSquareRoundedBadgeOutline,
			mdiImageEdit,
			mdiImageEditOutline,
			mdiFullscreen,
			mdiFullscreenExit,
			mdiBorderVertical,
			mdiArrowSplitHorizontal,
			mdiAccessPoint,
			mdiAccessPointOff,
			mdiRecord,
			mdiStop,
			mdiPause,
			mdiPlayPause,
			mdiConnection,
			mdiCameraOff,
			mdiCamera,
			mdiMotionPlayOutline,
			mdiMotionPlay,
			Icon: Index,
			compareVersions,
			obs,
			sendCommand,
			ProgramPreview,
			SceneSwitcher,
			SourceSwitcher,
			ProfileSelect,
			SceneCollectionSelect,
			connected,
			heartbeat,
			heartbeatInterval,
			isFullScreen,
			isStudioMode,
			isSceneOnTop,
			isVirtualCamActive,
			isIconMode,
			isReplaying,
			editable,
			address,
			password,
			scenes,
			replayError,
			errorMessage,
			imageFormat,
			formatTime,
			toggleFullScreen,
			toggleStudioMode,
			toggleReplay,
			switchSceneView,
			startStream,
			stopStream,
			startRecording,
			stopRecording,
			startVirtualCam,
			stopVirtualCam,
			pauseRecording,
			resumeRecording,
			connect,
			disconnect
		});

		$$self.$inject_state = $$props => {
			if ('connected' in $$props) $$invalidate(1, connected = $$props.connected);
			if ('heartbeat' in $$props) $$invalidate(2, heartbeat = $$props.heartbeat);
			if ('heartbeatInterval' in $$props) heartbeatInterval = $$props.heartbeatInterval;
			if ('isFullScreen' in $$props) $$invalidate(3, isFullScreen = $$props.isFullScreen);
			if ('isStudioMode' in $$props) $$invalidate(4, isStudioMode = $$props.isStudioMode);
			if ('isSceneOnTop' in $$props) $$invalidate(5, isSceneOnTop = $$props.isSceneOnTop);
			if ('isVirtualCamActive' in $$props) $$invalidate(6, isVirtualCamActive = $$props.isVirtualCamActive);
			if ('isIconMode' in $$props) $$invalidate(0, isIconMode = $$props.isIconMode);
			if ('isReplaying' in $$props) $$invalidate(7, isReplaying = $$props.isReplaying);
			if ('editable' in $$props) $$invalidate(8, editable = $$props.editable);
			if ('address' in $$props) $$invalidate(9, address = $$props.address);
			if ('password' in $$props) $$invalidate(10, password = $$props.password);
			if ('scenes' in $$props) $$invalidate(11, scenes = $$props.scenes);
			if ('replayError' in $$props) $$invalidate(12, replayError = $$props.replayError);
			if ('errorMessage' in $$props) $$invalidate(13, errorMessage = $$props.errorMessage);
			if ('imageFormat' in $$props) $$invalidate(14, imageFormat = $$props.imageFormat);
		};

		if ($$props && "$$inject" in $$props) {
			$$self.$inject_state($$props.$$inject);
		}

		$$self.$$.update = () => {
			if ($$self.$$.dirty[0] & /*isIconMode*/ 1) {
				isIconMode
				? window.localStorage.setItem('isIconMode', 'true')
				: window.localStorage.removeItem('isIconMode');
			}
		};

		return [
			isIconMode,
			connected,
			heartbeat,
			isFullScreen,
			isStudioMode,
			isSceneOnTop,
			isVirtualCamActive,
			isReplaying,
			editable,
			address,
			password,
			scenes,
			replayError,
			errorMessage,
			imageFormat,
			toggleFullScreen,
			toggleStudioMode,
			toggleReplay,
			switchSceneView,
			startStream,
			stopStream,
			startRecording,
			stopRecording,
			startVirtualCam,
			stopVirtualCam,
			pauseRecording,
			resumeRecording,
			connect,
			disconnect,
			click_handler,
			click_handler_1,
			sceneswitcher_scenes_binding,
			input0_input_handler,
			input1_input_handler
		];
	}

	class App extends SvelteComponentDev {
		constructor(options) {
			super(options);
			init(this, options, instance, create_fragment, safe_not_equal, {}, null, [-1, -1]);

			dispatch_dev("SvelteRegisterComponent", {
				component: this,
				tagName: "App",
				options,
				id: create_fragment.name
			});
		}
	}

	const app = new App({
	  target: document.body
	});

	return app;

})();
//# sourceMappingURL=bundle-vstatic.js.map
