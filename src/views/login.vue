<template>
  <div class="login-box">
    <card-wrap class="card">
      <div class="title" slot="title"><img src="./../assets/img/logo-small.png" alt="">管理平台</div>
      <Form class="form" ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" size="large" v-model="formInline.user" placeholder="请填写用户名">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" size="large" v-model="formInline.password" placeholder="请填写密码">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <Button class="btn" type="primary" long @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </card-wrap>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'Login',
  data () {
    return {
      formInline: {
        user: 'admin',
        password: '123456'
      },
      ruleInline: {
        user: [{ required: true, message: '请填写用户名', trigger: 'blur' }],
        password: [
          { required: true, message: '请填写密码', trigger: 'blur' },
          {
            type: 'string',
            min: 1,
            message: '密码长度不能小于6位',
            trigger: 'blur'
          }
        ],
        code: [{ required: true, message: '请填写验证码', trigger: 'blur' }]
      }
    }
  },
  created () {
    this.init()
  },
  methods: {
    ...mapActions([
      'login'
    ]),
    init () {},
    // 登录
    handleSubmit (name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.login(this.formInline)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login-box {
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: #17233d;

  align-items: center;
  justify-content: center;
}
.card {
  width: 400px;
  .title {
    font-size: 20px;
    display: flex;
    flex-direction: row;

    align-items: center;
    justify-content: center;
    img {
      width: auto;
      height: 30px;
      margin-right: 10px;
    }
  }
  .form {
    padding: 0 20px;
    padding-top: 20px;
    .ivu-input {
      font-size: 18px;
      height: 40px;
      border: none;
      background-color: #fff;
      box-shadow: inset 0 1px 2px #515a6e;
    }
    .btn {
      font-weight: bold;
      height: 40px;
    }
  }
}
</style>
