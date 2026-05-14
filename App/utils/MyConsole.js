export const MyConsole = {
  log: (params1, params2) => {
    if (__DEV__) {
      if (params2) {
        console.log(` =============== ${params1} ============ `, params2);
      } else {
        console.log(` =============== ${params1} ============ `);
      }
    }
  },
};
