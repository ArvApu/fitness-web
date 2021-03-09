<template>
  <div class="not-found">

    <div class="not-found-code">
      404
    </div>

    <div class="not-found-text">
      <p>
        Sorry, it looks like we couldn't find what you're looking for.
        <br />
        Click the button below to go back.
      </p>
      <router-link :to="{name: 'Home'}" class="btn not-found-button">Return to the app</router-link>
    </div>
    </div>
</template>

<script>

export default {
  name: 'NotFound',
};
</script>

<style scoped>
  .not-found {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    background-image: url("../assets/images/404.jpg");
    background-size:     cover;
    background-repeat:   no-repeat;
    background-position: center center;
  }

  .not-found-text {
    font-size: 45px;
    font-weight: bold;
    color: #494545;
    width: 40%;
  }

  .not-found-code {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-left: 140px;
    font-size: 186px;
    font-weight: bold;
    color: #494545;
  }

  .not-found-button {
    width: 100%;
    background: #494545;
    color: #ffffff;
    outline: none
  }

  .btn:focus {
    outline: none;
    border-color: black;
    box-shadow: 0 0 0 0;
  }

</style>