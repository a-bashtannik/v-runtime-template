/**
 * v-runtime-template v1.6.2
 * (c) 2019 Alex J <alexjovermorales@gmail.com>
 * @license MIT
 */

'use strict';

var defineDescriptor = function (src, dest, name) {
  if (!dest.hasOwnProperty(name)) {
    var descriptor = Object.getOwnPropertyDescriptor(src, name);
    Object.defineProperty(dest, name, descriptor);
  }
};

var merge = function (objs) {
  var res = {};
  objs.forEach(function (obj) {
    obj &&
      Object.getOwnPropertyNames(obj).forEach(function (name) { return defineDescriptor(obj, res, name); }
      );
  });
  return res;
};

var buildFromProps = function (obj, props) {
  var res = {};
  props.forEach(function (prop) { return defineDescriptor(obj, res, prop); });
  return res;
};

var index = {
  props: {
    template: String
  },
  render: function render(h) {
    var this$1 = this;

    if (this.template) {
      var ref = this.$parent;
      var $data = ref.$data; if ( $data === void 0 ) $data = {};
      var $props = ref.$props; if ( $props === void 0 ) $props = {};
      var $options = ref.$options; if ( $options === void 0 ) $options = {};
      var components = $options.components; if ( components === void 0 ) components = {};
      var computed = $options.computed; if ( computed === void 0 ) computed = {};
      var methods = $options.methods; if ( methods === void 0 ) methods = {};
      var filters = $options.filters; if ( filters === void 0 ) filters = {};
      var watch = $options.watch; if ( watch === void 0 ) watch = {};

      var passthrough = {$data:{}, $props:{}, $options:{}, components:{}, computed:{}, methods:{}, filters:{}, watch: {}};

      if (typeof this.$options.methods === "undefined") {
        this.$options.methods = {};
      }
      if (typeof this.$options.computed === "undefined") {
        this.$options.computed = {};
      }
      if (typeof this.$options.components === "undefined") {
        this.$options.components = {};
      }
      if (typeof this.$options.filters === "undefined") {
        this.$options.filters = {};
      }
      if (typeof this.$options.watch === "undefined") {
        this.$options.watch = {};
      }

      //build new objects by removing keys if already exists (e.g. created by mixins)
      Object.keys($data).forEach(function (e) {if(typeof this$1.$data[e]==="undefined") { passthrough.$data[e] = $data[e]; }} );
      Object.keys($props).forEach(function (e) {if(typeof this$1.$props[e]==="undefined") { passthrough.$props[e] = $props[e]; }} );

      Object.keys(methods).forEach(function (e) {if(typeof this$1.$options.methods[e]==="undefined") { passthrough.methods[e] = methods[e]; }} );
      Object.keys(filters).forEach(function (e) {if(typeof this$1.$options.filters[e]==="undefined") { passthrough.filters[e] = methods[e]; }} );
      Object.keys(watch).forEach(function (e) {if(typeof this$1.$options.watch[e]==="undefined") { passthrough.watch[e] = methods[e]; }} );

      Object.keys(computed).forEach(function (e) {if(typeof this$1.$options.computed[e]==="undefined") { passthrough.computed[e] = computed[e]; }} );
      Object.keys(components).forEach(function (e) {if(typeof this$1.$options.components[e]==="undefined") { passthrough.components[e] = components[e]; }} );

      var methodsKeys = Object.keys(passthrough.methods || {});
      // const dataKeys = Object.keys(passthrough.$data || {});
      var filtersKeys = Object.keys(passthrough.filters || {});
      var watchKeys = Object.keys(passthrough.watch || {});
      var propKeys = Object.keys(passthrough.$props || {});

      var allKeys = propKeys; //.concat(methodKeys);

      // const methodsFromProps = buildFromProps(this.$parent, methodKeys);
      var props = merge([passthrough.$data, passthrough.$props]);

      var dynamic = {
        template: this.template || "<div></div>",
        props: allKeys,
        data: function() { return passthrough.$data},
        filters: buildFromProps(filters, filtersKeys),
        watch: buildFromProps(watch, watchKeys),
        methods: buildFromProps(methods, methodsKeys),
        computed: passthrough.computed,
        components: passthrough.components
      };

      return h(dynamic, {
        props: props
      });
    }
  }
};

module.exports = index;
