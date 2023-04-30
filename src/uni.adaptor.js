import store from "./store";

uni.addInterceptor({
  returnValue (res) {
    if (!(!!res && (typeof res === "object" || typeof res === "function") && typeof res.then === "function")) {
      return res;
    }
    return new Promise((resolve, reject) => {
      res.then((res) => res[0] ? reject(res[0]) : resolve(res[1]));
    });
  },
});

uni.addInterceptor('showToast', {
  invoke (args) {
    if (!args.icon) {
      args.icon = 'none'
    }
  }
})

uni.addInterceptor('request', {
  returnValue(args) {
    return {
      xhr: args,
      promise: new Promise((resolve, reject) => {
        args._xhr.onload = function () {
          const res = JSON.parse(this.response)
          if (this.status === 200) {
            if (res.error) {
              uni.showToast({
                title: res.error.message,
              })
              reject(new Error(res.error.message))
            } else {
              resolve(res)
            }
          } else {
            let message = '操作失败，请重试'
            if (res.data && res.data.errors) {
              message = res.data.errors[0].message
            }
            uni.showToast({
              title: message,
            })
            reject(res)
          }
        };
      })
    }
  }
})