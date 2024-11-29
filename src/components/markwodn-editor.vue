<template>
  <client-only>
    <div class="el-input__wrapper" style="padding: 1px">
      <MdEditor
        ref="mdEditor"
        v-model="value"
        :theme="appStore.theme"
        :preview="false"
        :toolbars="toolbars"
        :style="{ height: height }"
        :placeholder="placeholder"
        @blur="syncBlur"
        @focus="syncFocus"
        @on-change="change"
        @on-upload-img="uploadImg"
      />
      <el-input v-show="false" ref="hiddenInput" v-model="value" />
    </div>
  </client-only>
</template>

<script setup>
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const hiddenInput = ref();

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  height: {
    type: String,
    default: '400px',
  },
  placeholder: {
    type: String,
    default: '请输入...',
  },
  formInstance: {
    type: Object,
    default: null,
  },
});

const emits = defineEmits(['update:modelValue', 'update:content', 'update:imageList']);

const value = ref(props.modelValue);

const toolbars = ref([
  'bold',
  'underline',
  'italic',
  '-',
  'title',
  'strikeThrough',
  'sub',
  'sup',
  'quote',
  'unorderedList',
  'orderedList',
  'task',
  '-',
  'codeRow',
  'code',
  'link',
  'image',
  'table',
  // "mermaid",
  // "katex",
  '-',
  'revoke',
  'next',
  'save',
  '=',
  'pageFullscreen',
  'fullscreen',
  'preview',
  'htmlPreview',
  'catalog',
]);

const appStore = useAppStore();

const syncBlur = async (event) => {
  props.formInstance.validateField('content', () => {});
};

const syncFocus = async (event) => {};

function change(v) {
  emits('update:modelValue', v);
}

const uploadImg = async (files, callback) => {
  const res = await Promise.all(
    files.map(async (file) => {
      return await getBase64(file);
    }),
  );
  callback(res);
};

const getBase64 = (file) => {
  return new Promise((rev, rej) => {
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        rev(reader.result);
      };
      reader.readAsDataURL(file);
    } catch (e) {
      rej(e);
    }
  });
};
</script>

<style lang="scss" scoped>
.el-input__wrapper:hover {
  box-shadow: inherit;
}

:deep {
  svg.md-editor-icon {
    width: 24px;
    height: 24px;
  }

  .md-editor {
    border-radius: 4px;
  }

  .md-editor-footer {
    align-items: center;
  }
}

.el-form-item.is-error {
  .el-input__wrapper {
    padding-top: 1rem;
  }
}

.el-form-item.is-error .el-input__wrapper :deep .md-editor {
  border-color: transparent;
}
</style>
