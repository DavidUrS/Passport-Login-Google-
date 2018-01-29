// Add to .gitignore, the keys of google, export, for used in "passport-setup" in the googleStrategy
module.exports={
  google:{
    clientID:'1071611663879-7qjo66thr3f4o9pncuviumfp3r21qefk.apps.googleusercontent.com',
    clientSecret:'-uJzwupdK3QjRGxSd7_lCCgj'
  },
  mongodb:{
    // Here use mLab
    dbURL: 'mongodb://David_Adrian:11111111David@ds113648.mlab.com:13648/passport-google'
  },
  session:{
    cookieKey: 'mi_first_example_whit_passport'
  }
}
