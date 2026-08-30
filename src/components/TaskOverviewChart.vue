<template>
  <div class="ChartSection">
    <Doughnut :data="chartData" :options="chartOptions" />

    <div class="chartText">
      <div class="count fs-4 fw-bold">{{ totalTasks }}</div>
      <div class="text">Total Tasks</div>
    </div>
  </div>
</template>

<script setup>
import { Chart as ChartJs, ArcElement, Tooltip, Legend } from "chart.js";
import { computed, onMounted, ref, watch } from "vue";
import { Doughnut } from "vue-chartjs";
import { useTaskStore } from "@/stores/taskStore";

// Define the task store
const taskStore = useTaskStore();

const totalTasks = ref(0);
const toDoTasks = ref(0);
const inProgressTasks = ref(0);
const inReviewTasks = ref(0);
const doneTasks = ref(0);

ChartJs.register({
  ArcElement,
  Tooltip,
  Legend,
});

const chartData = computed(() => {
  return {
    labels: ["To Do", "In Progress", "In Review", "Done"],
    datasets: [
      {
        data: [toDoTasks.value, inProgressTasks.value, inReviewTasks.value, doneTasks.value],

        backgroundColor: ["#fbac4a", "#9b71f0", "#069da0", "#33b33c"],
      },
    ],
  };
});

const chartOptions = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },

  cutout: "65%",
};

const loadChart = async () => {
  const resTotal = await taskStore.getTotalTasks();
  totalTasks.value = resTotal.totalTasks || 0;
  const resTodo = await taskStore.getTotalTasks("todo");
  toDoTasks.value = resTodo?.totalTasks || 0;

  const resProgress = await taskStore.getTotalTasks("inProgress");
  inProgressTasks.value = resProgress.totalTasks || 0;

  const resReview = await taskStore.getTotalTasks("inReview");
  inReviewTasks.value = resReview.totalTasks || 0;

  const resDone = await taskStore.getTotalTasks("done");
  doneTasks.value = resDone.totalTasks || 0;
};

watch(
  () => taskStore.refreshChart,
  async () => {
    await loadChart();
  },
);

onMounted(async () => {
  await loadChart();
});
</script>

<style lang="scss" scoped>
.ChartSection {
  position: relative;
  .chartText {
    position: absolute;
    inset: 0; // inset: 0 جعل العنصر يتمدد ليملأ كامل مساحة العنصر الأب
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
</style>
