<template>
  <div id="wrapper">
    <el-container>
      <el-aside>
        <Importers />
      </el-aside>
      <el-main>
        <DataTable />
      </el-main>
      <el-aside border="solid">
        <Exporters />
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Importers from '@/components/MainPage/Importers';
import DataTable from '@/components/MainPage/DataTable';
import Exporters from '@/components/MainPage/Exporters';

export default {
  name: 'MainPage',
  components: { Importers, DataTable, Exporters },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgba(255, 255, 255, 1) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100%;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

.title {
  color: #2c3e50;
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 6px;
  margin-left: auto;
  margin-right: auto;
}

.title.alt {
  font-size: 18px;
  margin-bottom: 10px;
}
</style>
