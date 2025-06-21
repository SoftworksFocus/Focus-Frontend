<template>
    <div class="Perfil">
        <div>
            <div class="Header">
        <img class ="avatar" src="data:image/png;base64,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">
        <h1>User.teste</h1>
        <p class="Biografia">Gamer casual, Rage profissional</p>
        <div class="Stats-Perfil">
            <span strong>350 Seguidores</span>
            <span strong>250 Seguindo</span>
            <h3>Posts relacionados</h3>
            <div class="grid-posts">
                <div class="postagens">
                    <img class="imagem-postagem" src="https://www.mooc.org/hs-fs/hubfs/learn-programming-career-jpg.jpeg?width=500&name=learn-programming-career-jpg.jpeg">
                    <p>Trampando</p>
                </div>
            </div>
        </div>
        </div>
    </div>
</div>
</template>

<script>
    export default{
        name:'Perfil',
    }

</script>
<style>
.Header {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
  margin-bottom: 10px;
}

h1 {
  margin: 10px 0 5px;
  color: #333;
}


.Stats-Perfil span {
  margin: 0 10px;
  font-size: 0.95em;
  color: #666;
}
.Perfil {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  text-align: center;
}

.Biografia {
  margin-top: 15px;
  font-style: italic;
  color: #555;
}

h3 {
  margin-top: 30px;
  color: #333;
}

.grid-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.postagens {
  border: 1px solid #eee;
  border-radius: 6px;
  overflow: hidden;
  background-color: #f9f9f9;
}

.imagem-postagem {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.postagens p {
  padding: 10px;
  font-size: 0.9em;
  color: #444;
  text-align: left;
}
</style>