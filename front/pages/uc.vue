<template>
  <div>
    <div>
      <input type="file" name="file" @change="handleFileChange" />
    </div>
    <div>
      <el-button @click="uploadFile">上传</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      file: null
    };
  },
  methods: {
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.file = file;
    },
    async uploadFile() {
      const form = new FormData();
      form.append("name", "file");
      form.append("file", this.file);
      const ret = await this.$http.post("/uploadFile", form);
      console.log(ret);
    }
  }
};
</script>
