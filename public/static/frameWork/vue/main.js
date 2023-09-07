const { createApp, ref, reactive, onMounted } = Vue;

window.privateVueInitFunction = ( option )=>{
  // return createApp( option )
  window.privateVue = createApp( option )
  .use(ElementPlus, {
    locale: ElementPlusLocaleZhCn,
  })
  .use(ElementPlusIconsVue)
  // .use(vant.Lazyload);
  // .mount('#app')
};

window.privateVueComponent = ( obj )=>{
  window.privateVue.component(obj.name, obj.component);
  
}

window.privateVueOnMount = ()=>{
  window.privateVue.mount('#app')
}
