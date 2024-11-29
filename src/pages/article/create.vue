<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus';

interface RuleForm {
  title: string;
  content: string;
  tag: string;
  avatar: string;
}

const ruleFormRef = ref<FormInstance>();
const articleForm = reactive<RuleForm>({
  title: 'cc',
  content: '',
  tag: '',
  avatar: '',
});
const rules = reactive<FormRules<RuleForm>>({
  title: [
    { required: true, message: '啥？', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  content: [
    { required: true, message: '啥？', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
  tag: [
    { required: true, message: '啥？', trigger: 'blur' },
    { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
  ],
});
const submitArticleForm = async (formEl: FormInstance | undefined) => {
  await formEl?.validate((val, rej) => {
    console.log(val, rej, formEl);
  });
};
</script>

<template>
  <section class="layout-container">
    <el-form
      ref="ruleFormRef"
      class="surface-card border-round p-5 flex flex-column gap-2"
      :rules="rules"
      :model="articleForm"
      status-icon
    >
      <span class="text-2xl">发文章</span>
      <el-form-item prop="title">
        <el-input v-model="articleForm.title" size="large" placeholder="标题" />
      </el-form-item>
      <el-form-item ref="mdEditorFormItem" prop="content">
        <markwodn-editor v-model="articleForm.content" :form-instance="ruleFormRef" />
      </el-form-item>
      <el-form-item prop="tag">
        <el-input v-model="articleForm.tag" size="large" placeholder="标签" />
      </el-form-item>
      <div>
        <el-button type="primary" @click="submitArticleForm(ruleFormRef)">
          发表
        </el-button>
      </div>
    </el-form>
  </section>
</template>

<style scoped lang="scss">
.layout-container {
  padding-top: 4.25rem;
}
</style>
