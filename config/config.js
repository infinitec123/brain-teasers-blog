module.exports = {
	development: {
		app: {
			name: 'BrainTeasers'
		},
		facebook: {
			clientID: "649397001786269",
			clientSecret: "378d786f9071b417353cdb42fabe06de",
			callbackURL: "http://brain-teasers-blog.herokuapp.com/auth/facebook/callback"
		}
	},
  	production: {
		app: {
			name: 'BrainTeasers'
		},
		facebook: {
			clientID: "649397001786269",
			clientSecret: "378d786f9071b417353cdb42fabe06de",
			callbackURL: "http://brain-teasers-blog.herokuapp.com/auth/facebook/callback"
		}
 	}
}
