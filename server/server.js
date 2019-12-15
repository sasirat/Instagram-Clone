let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");

let schema = buildSchema(`
  type User {
    id : String!
    nickname : String!
    avatar : String!
  }
  type Post {
    id : String!
    user : User!
    caption : String!
    image : String!
  }
  type Query {
    user(id: String) : User!
    post(user_id: String, post_id: String) : Post!
    posts(user_id: String) : [Post]
  }
`);

let userslist = {
  a: {
    id: "a",
    nickname: "Chris",
    avatar: "https://www.laravelnigeria.com/img/chris.jpg"
  },
};
let postslist = {
  a: {
    a: {
      id: "a",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    },
    b: {
      id: "b",
      user: userslist["a"],
      caption: "Angular Book :)",
      image: "https://cdn-images-1.medium.com/max/1000/1*ltLfTw87lE-Dqt-BKNdj1A.jpeg"
    }, 
    c: {
      id: "c",
      user: userslist["a"],
      caption: "Me at Frontstack.io",
      image: "https://pbs.twimg.com/media/DNNhrp6W0AAbk7Y.jpg:large"
    },
    d: {
      id: "d",
      user: userslist["a"],
      caption: "Moving the community!",
      image: "https://pbs.twimg.com/media/DOXI0IEXkAAkokm.jpg"
    }
  }
};
let root = {
  user: function ({ id }) {
    return userslist[id];
  },
  post: function ({ user_id, post_id }) {
    return postslist[user_id][post_id];
  },
  posts: function ({ user_id }) {
    return Object.values(postslist[user_id]);
  }
};

let app = express();
app.use(cors());
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log(`Server is running in http://localhost:4000`)
});

let Pusher = require("pusher");
let bodyParser = require("body-parser");
let Multipart = require("connect-multiparty");

let pusher = new Pusher({
  appId: 'PUSHER_APP_ID',
  key: 'PUSHER_APP_KEY',
  secret: 'PUSHER_APP_SECRET',
  cluster: 'PUSHER_CLUSTER',
  encrypted: true
});

let multipartMiddleware = new Multipart();

app.post('/newpost', multipartMiddleware, (req,res) =>{
  let post = {
    user : {
      nickname : req.body.name,
      avatar : req.bodyavatar
    },
    image : req.body.name,
    caption : req.body.caption
  }

  pusher.trigger("posts-channel", "new-post",{
    post
  });
  return res.json({status : "Post created"});
});