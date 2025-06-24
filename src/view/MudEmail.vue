<template>
    <div class="credentials-change-container">
        <h3 class="change-title">Mudança de credenciais</h3>
        <span>digite seu novo e-mail</span>
        <input type="text" placeholder="usuario@gmail.com" class="change-input"/>
        <span>confirme seu novo e-mail</span>
        <input type="text" placeholder="usuario@gmail.com" class="change-input"/>
        <button class="btn-primary">Confirmar</button>
    </div>
</template>

<script>
    export default{
        name:'MudEmail',
    }
</script>

<style scoped>
.credentials-change-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 30px 20px;
    background-color: var(--card-bg); 
    border-radius: 8px;
    box-shadow: var(--card-shadow); 
    display: flex;
    flex-direction: column;
    align-items: center;
    color: var(--text-color); 
    transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
}

.change-title {
    margin-bottom: 25px;
    text-align: center;
    color: var(--text-color); 
}

.credentials-change-container span {
    color: var(--text-color); 
    margin-bottom: 10px;
}

.change-input {
    width: calc(100% - 40px);
    height: 35px;
    padding-left: 20px;
    margin-bottom: 20px;
    border: 1px solid var(--border-color); 
    border-radius: 5px;
    background-color: var(--body-bg); 
    color: var(--text-color); 
    transition: border-color 0.2s ease, background-color 0.2s ease;
}
.change-input::placeholder {
    color: var(--text-color-secondary);
}
.change-input:focus {
    outline: none;
    border-color: var(--link-color);
}

.btn-primary {
    width: 180px;
    height: 40px;
    border-radius: 20px;
    color: var(--button-primary-text-color);
    background: var(--button-primary-bg);
    border: 1px solid var(--button-primary-bg);
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
}
.btn-primary:hover {
    filter: brightness(0.9);
}
</style>