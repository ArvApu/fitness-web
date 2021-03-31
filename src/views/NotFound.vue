<template>
  <div class="not-found">

    <div class="not-found-code">
      404
    </div>

    <div class="not-found-text">
      <p>
        Sorry, it looks like we couldn't find what you're looking for.
        <br />
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

  @media only screen and (max-width: 1300px) {

    .not-found-text {
      font-size: 35px;
    }

    .not-found-code {
      padding-left: 110px;
      font-size: 160px;
    }
  }

  @media only screen and (max-width: 1100px) {

    .not-found-text {
      font-size: 25px;
    }

    .not-found-code {
      padding-left: 85px;
      font-size: 80px;
    }
  }

  @media only screen and (max-width: 700px) {

    .not-found {
      display: flex;
      flex-direction: column;
    }

    .not-found-code {
      font-size: 50px;
      padding-left: 0;
      display: flex;
      justify-content: center;
    }

    .not-found-text {
      font-size: 20px;
    }

    .not-found-button {
      width: 160px;
    }
  }

</style>