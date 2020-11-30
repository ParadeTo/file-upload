<template>
  <div>
    <h2>图片上传</h2>
    <div ref="drag" id="drag">
      <input type="file" name="file" @change="handleFileChange" />
    </div>
    <div>
      <el-progress
        :stroke-width="20"
        text-inside
        :percentage="progress"
      ></el-progress>
    </div>
    <div>
      <el-button @click="uploadFile">上传</el-button>
    </div>
  </div>
</template>

<style lang="stylus">
#drag
  height: 100px;
  line-height 100px
  border: 2px dashed #eee;
  text-align center;
  vertical-align middle
  // &:hover
  //   border-color red
</style>

<script>
export default {
  data() {
    return {
      file: null,
      progress: 0
    };
  },
  mounted() {
    this.bindEvents();
  },
  methods: {
    bindEvents() {
      const drag = this.$refs.drag;
      drag.addEventListener("dragover", e => {
        drag.style.borderColor = "red";
        e.preventDefault();
      });
      drag.addEventListener("dragleave", e => {
        drag.style.borderColor = "#eee";
        e.preventDefault();
      });
      drag.addEventListener("drop", e => {
        const files = e.dataTransfer.files;
        this.file = files[0];
        drag.style.borderColor = "#eee";
        e.preventDefault();
      });
    },
    handleFileChange(e) {
      const [file] = e.target.files;
      if (!file) return;
      this.file = file;
    },
    blobToString(blob) {
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          console.log(reader.result);
          resolve(reader.result);
        };
        reader.readAsBinaryString(blob);
      });
    },
    async isGif(file) {
      // GIF89a 和 GIF87a
      // 前面六个字节 47 49 46 38 39 61 or 47 49 46 38 37 61
      const ret = await this.blobToString(file.slice(0, 6));
      return ret === "GIF89a" || ret === "GIF87a";
    },
    async isJpg(file) {
      // 前面两个字节 FF D8 (ÿØ)
      // 后面两个字节 FF D9 (ÿÙ)
      const first2Bytes = await this.blobToString(file.slice(0, 2));
      const last2Bytes = await this.blobToString(file.slice(-2));
      return first2Bytes === "ÿØ" && last2Bytes === "ÿÙ";
    },
    async isPng(file) {
      // 89 50 4E 47 0D 0A 1A
      // 50 4E 47 0D 0A 1A => PNG
      const ret = await this.blobToString(file.slice(1, 7));
      return ret === "PNG";
    },
    async isImage(file) {
      return (
        (await this.isGif(file)) ||
        (await this.isJpg(file)) ||
        (await this.isPng(file))
      );
    },
    async uploadFile() {
      if (!(await this.isImage(this.file))) {
        console.error("请上传图片");
        return;
      }
      const form = new FormData();
      form.append("name", "file");
      form.append("file", this.file);
      const ret = await this.$http.post("/uploadFile", form, {
        onUploadProgress: progress => {
          this.progress = Number(
            ((progress.loaded / progress.total) * 100).toFixed(2)
          );
        }
      });
      console.log(ret);
    }
  }
};
</script>
