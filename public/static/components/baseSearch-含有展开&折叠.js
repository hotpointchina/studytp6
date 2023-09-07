// console.log( ' window -> ', window );
// console.log( ' window.privateVueComponent -> ', window.privateVueComponent );
// const { reactive } = Vue;

window.privateVueComponent({
  name:'baseSearch',
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
            <el-col :span="5">
              <el-form-item label="证书名称" prop="name" class="search-form-item">
                <el-input v-model="ruleForm.name" placeholder="证书名称" />
              </el-form-item>
            </el-col>
            
            <el-col :span="5">
              <el-form-item label="年龄" prop="age" class="search-form-item">
                <el-input-number v-model="ruleForm.age" :min="0" :max="160" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="帮扶类型" prop="helpType" class="search-form-item">
                <el-select v-model="ruleForm.helpType" placeholder="请选择帮扶类型">
                  <el-option label="全部" value="0" />
                  <el-option label="助困" value="1" />
                  <el-option label="助学" value="2" />
                  <el-option label="助军" value="3" />
                  <el-option label="助农" value="4" />
                </el-select>
              </el-form-item>
            </el-col>
          
            <el-col :span="4" class="search_form_button_group">
              <el-button type="primary" @click="submitForm(ruleFormRef)">查询</el-button>
              <el-button @click="resetForm(ruleFormRef)">重置</el-button>

              <span v-show="searchStatus.show" class="search_form_folder_button">
                <el-button type="default" link @click="folder">
                  {{searchStatus.title}}
                  <el-button 
                    ref="DArrowRightEL"
                    type="default" link
                    :icon="DArrowRight"
                    :style="{
                      width: '1em',
                      height: '1em',
                      marginLeft:'7px',
                      color: '#18AE66',
                      transition:'all 0.3s ease',
                      transform: searchStatus.iconRotate,
                    }"
                  ></el-button>
                </el-button>
              </span>
            </el-col>
          </el-row>
          
          <el-row>
            <el-col :span="5">
              <el-form-item label="证件类型" prop="idType" class="search-form-item">
                <el-select v-model="ruleForm.idType" placeholder="请选择证件类型">
                  <el-option label="全部" value="0" />
                  <el-option label="居民身份证" value="1" />
                  <el-option label="学生证" value="2" />
                  <el-option label="士官证" value="3" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="证件编号" prop="idNumber" class="search-form-item">
                <el-input v-model="ruleForm.idNumber" placeholder="证件编号" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="备注" prop="remark" class="search-form-item">
                <el-input v-model="ruleForm.remark" placeholder="备注" />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="备注" prop="remark" class="search-form-item">
                <el-input v-model="ruleForm.remark" placeholder="备注" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="5">
              <el-form-item label="开始时间" prop="startTime" class="search-form-item">
                <el-date-picker
                  v-model="dataPickerStartValue"
                  type="date"
                  placeholder="开始时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="结束时间" prop="endTime" class="search-form-item">
                <el-date-picker
                  v-model="dataPickerEndValue"
                  type="date"
                  placeholder="结束时间"
                />
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="备注" prop="remark" class="search-form-item">
                <el-input v-model="ruleForm.remark" placeholder="备注" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    `,
    setup(props,{emit}) {
      console.log( ' ElementPlusIconsVue -> ', ElementPlusIconsVue );
      const { DArrowRight } = ElementPlusIconsVue;
      console.log( ' ElementPlusIconsVue DArrowRight -> ', DArrowRight );

      const ruleFormRef = ref();
      const ruleForm = reactive({
        name: '',
        gender: '',
        age: 0,
        helpType: '',
        idType: '',
        idNumber: '',
        remark: '',
      });
      const rules = reactive({
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, message: '姓名最少应有 2 个字', trigger: 'blur' },
        ],
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' },
        ],
        helpType: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change',
          },
        ],
        idType: [
          {
            required: true,
            message: '请选择证件类型',
            trigger: 'change',
          },
        ],
        idNumber: [
          { required: true, message: '请输入证件编号', trigger: 'blur' },
          { min: 6, message: '证件编号最少应有 6 个字', trigger: 'blur' },
        ],
      });
      const submitForm = async (formEl) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            // console.log('submit!')
            emit('queryTable', {...ruleForm} );
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
        DArrowRight,
        ruleFormRef, ruleForm, rules,
        submitForm, resetForm,
        dataPickerStartValue, dataPickerEndValue,

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