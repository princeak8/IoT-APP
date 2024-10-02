<template>
    <AppHeader />
    <div class="p-4 max-w-4xl mx-auto">
      <h1 class="text-2xl font-bold mb-4">Distribution Transformer Dashboard</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-medium text-gray-500">Status</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" :class="{'text-green-500': status === true, 'text-red-500': status === false}" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-2xl font-bold">{{ (status==null) ? "Not Set" : (status) ? "ON" : "OFF" }}</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-medium text-gray-500">Voltage</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-2xl font-bold">{{ (voltage) ? parseInt(voltage) : "-" }} kV</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-medium text-gray-500">Current</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 7H7v6h6V7z" />
              <path fill-rule="evenodd" d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6h2v2H9V8zm8-5a3 3 0 00-3-3H6a3 3 0 00-3 3v6.414l-1.293 1.293a1 1 0 000 1.414l2 2A1 1 0 005 15h10a1 1 0 00.707-.293l2-2a1 1 0 000-1.414L16 9.414V3z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-2xl font-bold">{{ (current) ? parseInt(current) : "-" }} A</div>
        </div>
        
        <div class="bg-white rounded-lg shadow p-4">
          <div class="flex items-center justify-between">
            <h2 class="text-sm font-medium text-gray-500">Power</h2>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M11.3 2.026a.5.5 0 01.2.4v3.3a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-3.3a.5.5 0 01.2-.4l1-1a.5.5 0 01.6 0l1 1zM10 5.83V9h1.5a.5.5 0 010 1h-4a.5.5 0 010-1H9V5.83L7.35 4.35a.5.5 0 11.7-.7l1.45 1.45 1.45-1.45a.5.5 0 11.7.7L10 5.83z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="text-2xl font-bold">{{ (power) ? power.toFixed(2) : "-" }} Mw</div>
        </div>
      </div>
      
      <!-- <div class="bg-white rounded-lg shadow p-4">
        <h2 class="text-lg font-semibold mb-4">Historical Data</h2>
        <div class="h-80">
          <apexchart type="line" height="100%" :options="chartOptions" :series="chartSeries"></apexchart>
        </div>
      </div> -->
    </div>
  </template>
  
  <script setup lang="ts">
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import VueApexCharts from 'vue3-apexcharts';

    import AppHeader from '@/components/Header.vue'
    import { useAuthStore} from '@/stores/auth';
    import apiService from '@/ApiService'

    let status = ref();
    let power = ref();
    let current = ref();
    let voltage = ref();
  
  const generateSampleData = (count:any) => {
    const now = Date.now();
    return Array.from({ length: count }, (_, i) => ({
      timestamp: now - (count - i - 1) * 60000,
      voltage: 220 + Math.random() * 10,
      current: 10 + Math.random() * 5,
      temperature: 35 + Math.random() * 10,
      status: Math.random() > 0.9 ? 'Warning' : 'Normal',
    }));
  };
  
  const data = ref(generateSampleData(30));
  
  const latestReading = computed(() => data.value[data.value.length - 1]);
  
  const chartOptions = ref({
    chart: {
      id: 'transformer-chart',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 1000
        }
      },
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: [
      {
        title: {
          text: 'Voltage (V)'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Current (A)'
        }
      },
      {
        opposite: true,
        title: {
          text: 'Temperature (°C)'
        }
      }
    ],
    legend: {
      show: true
    }
  });
  
  const chartSeries = computed(() => [
    {
      name: 'Voltage',
      data: data.value.map(d => [d.timestamp, d.voltage])
    },
    {
      name: 'Current',
      data: data.value.map(d => [d.timestamp, d.current])
    },
    {
      name: 'Temperature',
      data: data.value.map(d => [d.timestamp, d.temperature])
    }
  ]);
  
  let interval:any;

  const getSubModule = async (id:number) => {
      return await apiService.get("/user/sub_module/"+id)
      .then((response) => {
          // console.log(response.data.data);
          return response?.data?.data;
      })
      .catch((error) => {
          console.log("Error while getting subModule ", error);
          return null;
      });
  }
  
  onMounted(async() => {

    const subModule = await getSubModule(1);
    if(subModule) {
        window.Echo.private(subModule.topic)
            .listen('.Publish', (event: any) => {
              console.log("listening to ", subModule.topic);
              try {
                  console.log(event);
                  console.log('Received event:', JSON.parse(event.data).status);
                  let data = JSON.parse(event.data);
                  status.value = data?.status;
                  power.value = data?.mw;
                  current.value = data?.A;
                  voltage.value = data?.v;
              } catch (error) {
                  console.error('Error processing event:', error);
              }
                // Handle the received data here
            }).error((error: any) => {
            console.error('Echo subscription error:', error);
        });
    }
    
    // window.Echo.channel('channel1')
    //     .listen('MessageSent', (event:any) => {
    //       console.log(event);
    // });

    interval = setInterval(() => {
      const newReading = generateSampleData(1)[0];
      data.value = [...data.value.slice(1), newReading];
    }, 5000);
  });
  
  onUnmounted(() => {
    clearInterval(interval);
  });
  </script>