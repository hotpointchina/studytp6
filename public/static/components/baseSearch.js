// console.log( ' window -> ', window );
// console.log( ' window.privateVueComponent -> ', window.privateVueComponent );
// const { reactive } = Vue;

window.privateVueComponent({
  name:'baseSearchComponent',
  component:{
    template: `
      <div ref="searchGroup" class="search_group">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="6em"
          class="search_form"
          :style="{ height: searchStatus.rowHeight }"
          size="default"
          status-icon
        >
          <el-row class="search_form_row">
            <el-col :span="10">
              <el-form-item label="证书名称" prop="name" class="search-form-item">
                <el-input v-model="ruleForm.name" placeholder="证书名称" />
              </el-form-item>
            </el-col>
            
            <el-col :span="4" class="search_form_button_group">
              <el-button type="success" :icon="Plus" @click="tableAdd"> 新增 </el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">查询</el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    `,
    setup(props,{emit}) {
      console.log( ' BaseSearch emit -> ', emit );
      console.log( ' ElementPlusIconsVue -> ', ElementPlusIconsVue );
      const { 
        Plus, 
        // DArrowRight 
      } = ElementPlusIconsVue;
      // console.log( ' ElementPlusIconsVue DArrowRight -> ', DArrowRight );

      const ruleFormRef = ref();
      const ruleForm = reactive({
        name: '',
        // gender: '',
        // age: 0,
        // helpType: '',
        // idType: '',
        // idNumber: '',
        // remark: '',
      });
      const rules = reactive({
        name: [
          { 
            // required: true, 
            message: '请输入姓名', 
            trigger: 'blur' 
          },
          { min: 2, message: '姓名最少应有 2 个字', trigger: 'blur' },
        ],
      });
      const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            // console.log(' BaseSearch ruleForm -> ', {...ruleForm} );
            emit('querytable', {...ruleForm} );
          } else {
            console.log('error submit!', fields)
          }
        })
      };
      // data-picker
      const dataPickerStartValue = ref('');
      const dataPickerEndValue = ref('');

      const resetForm = (formEl) => {
        if (!formEl) return
        formEl.resetFields()
      }
      const searchGroup = ref();
      const searchStatus = reactive({
        fold: true,
        show: false,
        title: '展开',
        rowHeight: '70px',
        iconRotate: 'rotate(90deg)'
      });
      const formEl = {
        wrap: null,
        row: null,
        rowNumber: 1,
        firstRow:70,
        standerHeight:50,
        fullHeight:''
      };

      // 展开 or 收起
      const folder = ()=>{
        if( searchStatus.fold ){
          searchStatus.fold = false;
          searchStatus.rowHeight = formEl.fullHeight;
          searchStatus.iconRotate = 'rotate(-90deg)';
          searchStatus.title = '折叠';
        }else{
          searchStatus.fold = true;
          searchStatus.rowHeight = '70px';
          searchStatus.iconRotate = 'rotate(90deg)';
          searchStatus.title = '展开';
        }
        emit(
          'isFolder',
          {
            status:searchStatus.fold,
            height: searchStatus.rowHeight
          }
        );
      };

      // 新增
      const tableAdd = ()=>{
        emit( 'add' );
      };



      onMounted(()=>{
        formEl.wrap = searchGroup.value.querySelector('.el-form');
        formEl.row = Array.from(searchGroup.value.querySelectorAll('.el-form .el-row'));
        formEl.rowNumber = formEl.row.length;
        formEl.fullHeight = ( (formEl.rowNumber-1)*formEl.standerHeight + formEl.firstRow ) + 'px';
      
        if( formEl.rowNumber > 1 ){
          searchStatus.title = '展开';
          searchStatus.fold = true;
          searchStatus.show = true;
        }
      });

      console.log( ' component searchStatus -> ', searchStatus );

      return {
        // DArrowRight, 
        Plus,
        ruleFormRef, ruleForm, rules,
        submitForm, resetForm,
        dataPickerStartValue, dataPickerEndValue,

        // 新增
        tableAdd,
        searchGroup,
        searchStatus, formEl,
        folder

      }
    },
  },
});



// Vue.components('baseSearch', {
// 	setup() {
//     const message = ref('baseSearch')
//     return {
//       message
//     }
//   },
// 	template: `
// 		<h1>{{message}}</h1>
// 	`
// })


// console.log( ' Vue -> ', Vue );
// console.log( ' Vue.component -> ', Vue.component );