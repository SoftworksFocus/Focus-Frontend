<template>
     <div class="profile-page-container">
        <div class="profile-header">
            <img class ="profile-avatar" src="@/assets/icon.png" alt="Avatar" />
            <h1>User.teste</h1>
            <p class="user-bio">Gamer casual, Rage profissional</p>
            <div class="profile-stats">
                <span><strong>350</strong> Seguidores</span>
                <span><strong>250</strong> Seguindo</span>
            </div>
            <h3>Posts relacionados</h3>
            <div class="grid-posts">
                <div class="post-item">
                    <img class="post-image" src="https://www.mooc.org/hs-fs/hubfs/learn-programming-career-jpg.jpeg?width=500&name=learn-programming-career-jpg.jpeg" alt="Postagem"/>
                    <p>Trampando</p>
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
<style scoped>
.profile-page-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: var(--card-bg); 
  border-radius: 8px;
  box-shadow: var(--card-shadow); 
  text-align: center;
  color: var(--text-color); 
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.profile-header {
  padding-bottom: 20px;
  border-bottom: 1px solid var(--border-color); 
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid var(--link-color); 
  margin-bottom: 10px;
  transition: border-color 0.3s ease;
}

h1 {
  margin: 10px 0 5px;
  color: var(--text-color);
}

.user-bio {
  margin-top: 15px;
  font-style: italic;
  color: var(--text-color-secondary); 
}

.profile-stats {
  margin-top: 15px;
}

.profile-stats span {
  margin: 0 10px;
  font-size: 0.95em;
  color: var(--text-color-secondary); 
}
.profile-stats strong {
    color: var(--text-color); 
}

h3 {
  margin-top: 30px;
  color: var(--text-color); 
}

.grid-posts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.post-item {
  border: 1px solid var(--border-color); 
  border-radius: 6px;
  overflow: hidden;
  background-color: var(--task-item-bg); 
  box-shadow: var(--card-shadow);
  transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
}

.post-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.post-item p {
  padding: 10px;
  font-size: 0.9em;
  color: var(--text-color);
  text-align: left;
}
</style>