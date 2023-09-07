
window.privateVueComponent({
  name:'editPageComponent',
  component:{
    template: `
      <div class="page_wrap" ref="page_wrap">
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          :rules="rules"
          label-width="84px"
          class="gy-form"
          size="default"
          status-icon
        >
          <el-form-item 
            class="gy-form-item"
            v-for="item in formList"
            :key="item.prop"
            :prop="item.prop"
            :label="item.label"
          >
            <el-input
              v-if="item.type == 'input'"
              v-model.trim="ruleForm[item.prop]"
              :placeholder="item.placeholder"
              clearable
            />

            <el-input-number
              v-if="item.type == 'inputNumber'"
              v-model="ruleForm[item.prop]"
              :min="item.min" :max="item.max"
            />

            <el-input
              class="input_nature_number"
              v-if="item.type == 'inputNatureNumber'"
              type="number"
              v-model="ruleForm[item.prop]"
              :placeholder="item.placeholder"
              clearable
            />

            <el-input 
              v-if="item.type == 'textarea'"
              type="textarea" 
              v-model="ruleForm[item.prop]"
              :placeholder="item.placeholder"
              clearable
            />

            <!-- select -->
            <el-select
              v-if="item.type == 'select'"
              v-model="ruleForm[item.prop]"
              :placeholder="item.placeholder"
            >
              <el-option 
                v-for="option in item.option"
                :key="option.label"
                :label="option.label"
                :value="option.value" 
              />
            </el-select>

            <el-date-picker
              v-if="item.type == 'datePicker'"
              v-model="ruleForm[item.prop]"
              :type="item.subType"
              :placeholder="item.placeholder"
            />
          </el-form-item>

          <el-row class="flex justify-center w-full ml-84px">
            <el-button @click="showEditPageClose">取消</el-button>
            <el-button type="primary" @click="submitFrom(ruleFormRef)">提交</el-button>
          </el-row>
        </el-form>

      </div>
    `,
    setup(props,{emit}) {
      console.log( ' editPage submitFrom props -> ',  props );


      const ruleFormRef = ref();
      const ruleForm = reactive({
        certificateName: '',
      });
      const rules = reactive({
        certificateName: [
          { 
            required: true, 
            message: '请输入证书名称', 
            trigger: 'blur' 
          },
          { min: 2, message: '证书名称最少应有 2 个字', trigger: 'blur' },
        ],
        createName: [
          { 
            required: true, 
            message: '请输入创建人姓名', 
            trigger: 'blur' 
          },
          { min: 2, message: '创建人姓名最少应有 2 个字', trigger: 'blur' },
        ],
      });
      
      const formList = [
        {
          type: 'input',
          prop:"certificateName",
          label:"证书名称",
          placeholder: "证书名称",
        },
        {
          type: 'input',
          prop:"createName",
          label:"创建人",
          placeholder: "创建人",
        }
      ];
      
      // 关闭 新增/编辑 before
      const showEditPageClose = (modal, data)=>{
        modal = modal ? modal : 'cancel';
        emit('submit', modal, data );
      };
      // 提交 新增/编辑 表单
      const submitFrom = async (formEl) => {
        // console.log( ' editPage submitFrom props -> ',  props );
        // console.log( ' editPage submitFrom props.pageTitle -> ',  props.pageTitle );

        if (!formEl) return;
        // 表单校验
        await formEl.validate((valid, fields) => {
          if (valid) {
            ruleForm.createTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
            
            showEditPageClose('add', ruleForm );
            // switch ( props.pageTitle ) {
            //   case '新增':
            //       showEditPageClose('add', ruleForm );
            //       // emit('add',{

            //       // });
            //     break;
                
            //   case '编辑':
            //       showEditPageClose('modify',ruleForm);
            //     break;
            // }

          } else {
            console.log('error submitFrom!', fields)
          }
        })
      };


      // editData
      // onMounted(()=>{
      //   switch( props.pageTitle ){
      //     case '新增':
      //       emit('add');
      //       break;
      //     case '编辑':
      //       Object.keys(ruleForm).forEach(key=>{
      //         ruleForm[key] = props.editData[key];
      //       });
      //       break;
      //   }
      // });

      // console.log( ' component searchStatus -> ',  );

      return {
        props,
        ruleFormRef, ruleForm, rules,
        formList,
        // formEl,
        // 关闭 新增/编辑 before
        showEditPageClose,
        // 提交 新增/编辑 表单
        submitFrom,
      }
    },
  },
});


