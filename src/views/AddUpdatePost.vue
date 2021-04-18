<template>
  <div class="container register">
    <div class="row">
      <div class="col-lg-12 register-right">
        <div class="tab-content">
          <div class="tab-pane fade show active"
               role="tabpanel" aria-labelledby="home-tab">
            <h3 class="register-heading">
              <template v-if="isUpdate">Изменить пост</template>
              <template v-else>Добавить пост</template>
            </h3>
            <form class="row register-form" enctype="multipart/form-data" @submit.prevent="handleAddUpdatePost">
              <!--handle error message from backend-->
              <div v-if="message" class="alert alert-danger mb-2 w-100"
                   role="alert">
                {{ message }}
                <button type="button" class="close"
                        data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <!---->
              <div class="form-group input-group">
                <ckeditor :editor="editor" v-model="form.text" :config="editorConfig"></ckeditor>
              </div>

              <div class="form-group input-group">
                <select class="custom-select" v-model="form.group">
                  <option selected>Выберите сообщество*</option>
                  <option v-for="option in options.groups" :value="option.value" :key="option">
                    {{ option.text }}
                  </option>
                </select>
              </div>

              <div class="form-group input-group">
                <select class="selectpicker" multiple v-model="form.tags" title="Выберите теги*">
                  <option v-for="option in options.tags" :value="option.value" :key="option">
                    {{ option.text }}
                  </option>
                </select>
              </div>

              <div class="form-group input-group custom-file">
                <input type="file" class="custom-file-input" id="customFile"
                       accept="image/*" ref="file" v-on:change="handleFileUpload()">
                <label class="custom-file-label" for="customFile" data-browse="Загрузить">
                  <template v-if="form.image">{{ form.image.name }}</template>
                  <template v-else>Выберите картинку*</template>
                </label>
              </div>
              <p class="text-right text-secondary btn-block"><small>* - необязательно к заполнению</small></p>
              <div class="form-group mt-3">
                <button type="submit" class="btn btn-primary btn-block">
                  <i class="fas fa-pencil-alt"></i>
                  <template v-if="isUpdate">Изменить</template>
                  <template v-else>Добавить</template>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-vue';
import UserService from "../services/user.service";
import axios from "axios";

export default {
  name: "AddPost",
  components: {
    ckeditor: CKEditor.component
  },
  props: [
    'id'
  ],
  data() {
    return {
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', '|', 'bold', 'italic', 'link', 'bulletedList', 'numberedList', 'blockQuote'],
        heading: {
          options: [
            {model: 'paragraph', title: 'Параграф', class: 'ck-heading_paragraph'},
            {model: 'heading3', view: 'h3', title: 'Заголовок 3', class: 'ck-heading_heading3'},
            {model: 'heading4', view: 'h4', title: 'Заголовок 4', class: 'ck-heading_heading4'}
          ]
        }
      },
      message: '',
      form: {
        text: '',
        group: 'Выберите сообщество*',
        tags: [],
        image: ''
      },
      options: {
        groups: [],
        tags: []
      }
    }
  },
  computed: {
    isUpdate() {
      return !!this.id
    },
    currentUser() {
      return this.$store.state.auth.user;
    },
  },
  created() {
    this.loadListGroups();
    this.loadListTags();
    if (this.isUpdate) {
      this.loadPost();
    }
  },
  methods: {
    handleAddUpdatePost() {
      if (this.isUpdate) {
        this.handleUpdatePost()
      }
      else{
        this.handleAddPost()
      }
    },
    handleAddPost() {
      let form = this.prepareForm()
      UserService.addPost(form).then(
          () => {
            this.$router.push({name: 'Home', params: {message: 'Пост успешно добавлен.'}});
          },
          error => {
            this.message = error;
          }
      );
    },
    handleUpdatePost() {
      let form = this.prepareForm()
      UserService.updatePost(this.id, form).then(
          () => {
            this.$router.push({name: 'Post', params: {'id': this.id}});
          },
          error => {
            this.message = error;
          }
      );
    },
    checkAuthorPost(post) {
      if (this.currentUser.username !== post.author.username) {
        this.$router.push({name: '404', params: {'from_url': window.location.href}});
      }
    },
    prepareForm() {
      let data = new FormData();
      data.append('text', this.form.text);
      if (this.form.group !== 'Выберите сообщество*') {
        data.append('group', this.form.group)
      }
      if (this.form.image !== '') {
        data.append('image', this.form.image)
      }
      if (this.form.tags !== []) {
        for (let i = 0; i < this.form.tags.length; i++) {
          data.append('tags', this.form.tags[i]);
        }
      }
      return data;
    },
    handleFileUpload() {
      this.form.image = this.$refs.file.files[0];
    },
    loadPost() {
      UserService.getPost(this.id).then(
          response => {
            this.checkAuthorPost(response.data);
            $('.selectpicker').selectpicker('refresh');
            if (response.data.tags) {
              this.form.tags = response.data.tags.map(x => x.id);
              $('.selectpicker').selectpicker('val', this.form.tags);
            }
            if (response.data.group) {
              this.form.group = response.data.group.id
            }
            this.form.text = response.data.text;
            if (response.data.image) {
              let imageName = response.data.image.split('/').pop();
              UserService.getImage(response.data.image).then(response => {
                this.form.image = new File([response.data], imageName);
              })
            }
          },
      );
    },
    loadListGroups() {
      UserService.getListGroups().then(
          response => {
            this.options.groups = response.data.map(x => {
              return {value: x.id, text: x.title}
            });
          },
      );
    },
    loadListTags() {
      UserService.getListTags().then(
          response => {
            this.options.tags = response.data.map(x => {
              return {value: x.id, text: x.title}
            });
          },
      );
    }
  }
}
</script>

<style scoped>

</style>