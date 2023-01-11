<template>
    <div class="item">
      <div class="id">
        <div class="row"> 
          <input class="form-check-input col-auto p-2 ms-2" type="radio" value="" id="flexCheckDefault">
          <p class="col-3 ms-4">{{ source.id }}</p>
          <p class="col-3 ms-5">{{ source.text }}</p>
          <p class="col-3 ms-4">{{ source.text }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'item-component',
    props: {
      index: {
        type: Number
      },
      source: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .item {
    display: flex;
    flex-direction: column;
    border: 1px solid lightgrey;
    border-radius: 10px;
    padding: 1em;
    margin: 2px;

  }

 
  
  .item .item:nth-child(odd) {background: blue;}
  </style>