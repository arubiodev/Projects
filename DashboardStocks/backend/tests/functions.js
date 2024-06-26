test("GET /api/favs", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/favs")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].option1).toBe(post.option1);
        expect(response.body[0].option2).toBe(post.option2);
      });
  });

  test("POST /api/favs", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/favs")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });

  test("POST /api/favs/test", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/favs/test")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });

  test("PATCH /api/favs/test", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/favs/test")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });


  test("DELETE /api/favs/test", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/favs")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });


  test("POST /api/user/signup", async () => {
    const post = await Post.create({ email: "demo1@demo.com", password: "demo1" });
  
    await supertest(app).get("/api/user/signup")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });


  test("POST /api/user/login", async () => {
    const post = await Post.create({ email: "demo1@demo.com", password: "demo1" });
  
    await supertest(app).get("/api/user/login")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });

  test("GET /api/votes", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/votes")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });

  test("POST /api/votes", async () => {
    const post = await Post.create({ title: "1", option1: "2", option2: "3" });
  
    await supertest(app).get("/api/votes")
      .expect(200)
      .then((response) => {
        
  
        // Check data
        expect(response.body[0]._id).toBe(post.id);
        expect(response.body[0].title).toBe(post.title);
        expect(response.body[0].content).toBe(post.content);
      });
  });