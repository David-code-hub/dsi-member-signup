<style>
.form-element {
  padding: 2.5px;
}

.label {
  margin-bottom: 0;
  font-weight: bold;
  font-size: 10px;
  color: #212427;
}

.sub-label {
  margin-bottom: 0;
  font-size: 7px;
  color: #212427;
}

.form-btn {
  font-weight: 490;
  color: #fff;
  background-color: #fdb417;
  border-color: #fdb417;
  width: 100%;
  height: 37px;
}

.form-btn-profile {
  font-weight: 490;
  font-size: 10px;
  width: 100%;
}

.info-banner {
  background-color: #fff7e7;
  color: #fdb417;
  padding: 2.5px;
  border-radius: 10px;
  margin-top: 10px;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-xs">
    <div>
      <Logo></Logo>
    </div>
    <p class="text-right text-primary text-12px">3/5</p>
    <q-linear-progress
      rounded
      size="6px"
      :value="0.6"
      color="primary"
      class="q-mt-sm"
    />

    <div class="row q-mt-md">
      <div class="col-12">
        <p class="label">When is your birthday?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your birthday.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-4">
        <q-select
          outlined
          color="primary"
          v-model="selectDay"
          hide-dropdown-icon
          hide-selected
          fill-input
          :options="updatedDateArr"
          @input-value="(value:any)=> (
            updatedDateArr =
              date.filter((m) =>
                m.toLowerCase().includes(value.toLowerCase())
              ) || date)
          "
          behavior="menu"
          input-debounce="0"
          use-input
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please select something',
          ]"
          placeholder="Date"
        />
      </div>
      <div class="form-element col-4">
        <q-select
          outlined
          color="primary"
          v-model="selectMonth"
          hide-dropdown-icon
          hide-selected
          fill-input
          :options="updatedMonthArr"
          @input-value="(value:any)=> (
            updatedMonthArr =
              month.filter((m) =>
                m.toLowerCase().includes(value.toLowerCase())
              ) || month)
          "
          behavior="menu"
          input-debounce="0"
          use-input
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please select something',
          ]"
          placeholder="Month"
        />
      </div>
      <div class="form-element col-4">
        <q-select
          outlined
          color="primary"
          v-model="selectYear"
          hide-dropdown-icon
          hide-selected
          fill-input
          :options="updatedYearArr"
          @input-value="(value:string)=>(
            updatedYearArr = years.filter((y:string)=> y.includes(value))
          )"
          :rules="[
            (val) => (val && val.length > 0) || 'Please select something',
          ]"
          use-input
          input-debounce="0"
          behavior="menu"
          placeholder="Year"
        />
      </div>

      <div
        class="col-12"
        v-if="
          handleCalculateAge(selectDay, selectMonth, selectYear) < 18 ||
          handleCalculateAge(selectDay, selectMonth, selectYear) > 35
        "
      >
        <div
          class="bg-red-1 rounded-md text-red row q-pa-xs q-my-sm"
          style="align-items: center"
        >
          <q-icon name="bi-info-circle" class="q-ma-sm" />
          <div style="font-size: 9px" class="col-10 text-weight-medium">
            To sign up, you must be aged between 18 and 35.
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <p class="label">What is your ID number?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your real ID number.</p>
      </div>
      <div class="col-12">
        <div
          class="zlto-bg-light rounded-md text-primary row q-pa-xs q-my-sm"
          style="align-items: center"
        >
          <q-icon name="bi-info-circle" class="q-ma-sm" />
          <div style="font-size: 9px" class="col-10 text-weight-medium">
            Your ID will be used to verify your identity which allows us to
            prevent duplicate accounts.
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          outlined
          v-model="demographicsForm.id_number"
          label="ID Number"
          lazy-rules
          counter
          mask="#############"
        />
      </div>
    </div>

    <div class="row q-mb-md">
      <div class="col-12">
        <p class="label">Let's get to know you?</p>
      </div>
      <div class="col-12">
        <p class="sub-label">
          The information you share will help us understand you.
        </p>
      </div>
    </div>

    <div class="row row q-mb-lg">
      <div class="form-element col-6">
        <p class="q-mb-sm">Race Group</p>
        <q-select
          outlined
          v-model="demographicsForm.race"
          :options="race"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Dependants</p>
        <q-select
          outlined
          v-model="demographicsForm.dependants"
          :options="dependants"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Gender</p>
        <q-select
          outlined
          v-model="demographicsForm.gender"
          :options="gender"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Disability</p>
        <q-select
          outlined
          v-model="demographicsForm.disability"
          :options="disability"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Service Provider</p>
        <q-select
          outlined
          v-model="demographicsForm.service_provider"
          :options="service_provider"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Postal Code</p>
        <q-input
          outlined
          v-model="demographicsForm.location"
          placeholder="7764"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Demographic info</p>
        <q-select
          outlined
          v-model="demographicsForm.demographic_info"
          :options="demographic_info"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
      <div class="form-element col-6">
        <p class="q-mb-sm">Province</p>
        <q-select
          outlined
          v-model="demographicsForm.province"
          :options="province"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />
      </div>
    </div>

    <div class="row q-mt-none">
      <div class="button-wrapper col-5 q-pr-sm">
        <q-btn
          unelevated
          :no-caps="true"
          to="/personal-details"
          class="form-btn"
          label="Back"
          outline
          type="submit"
          color="primary"
        />
      </div>
      <div class="button-wrapper col-7">
        <q-btn
          unelevated
          :no-caps="true"
          class="form-btn"
          label="Next"
          type="submit"
          :disabled="
            handleCalculateAge(selectDay, selectMonth, selectYear) < 18 ||
            handleCalculateAge(selectDay, selectMonth, selectYear) > 35
          "
          color="primary"
        />
      </div>
    </div>
  </q-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import { Notify } from "quasar";
import { handleCalculateAge } from "@/compositions/functions";
import months from "@/data/months.json";
import days from "@/data/day.json";

const router = useRouter();
const userStore = useUserStore();
const storedInfo = userStore.onboaringAccountInfo;
const dependants = ["Yes - family,parents,siblings", "No"];
const gender = ["Female", "Male", "Prefer Not To Say", "Non-conformist"];
const disability = ["Yes", "No"];
const service_provider = [
  "MTN",
  "Telkom",
  "Vodacom",
  "Cell C",
  "Afrihost ISP",
  "Web africa",
];

const demographic_info = ["Township", "Rural", "City", "Suburb"];

const province = [
  "Eastern Cape",
  "Free State",
  "Gauteng",
  "KwaZulu-Natal",
  "Limpopo",
  "Mpumalanga",
  "Northern Cape",
  "North West",
  "Western Cape",
];
const race = ["African", "Coloured", "Indian", "White", "Asian"];

const demographicsForm = reactive({
  dob: "",
  dependants: storedInfo.dependants || "",
  gender: storedInfo.gender || "",
  gender_other: "",
  province: storedInfo.province || "",
  service_provider: storedInfo.province || "",
  location: storedInfo.m_location || "",
  disability: storedInfo.disability || "",
  race: storedInfo.race || "",
  id_number: storedInfo.id_number || "",
  demographic_info: storedInfo.demographic_info || "",
  age: storedInfo.age || 0,
});

const selectYear = ref(storedInfo.dob.split("-")[2] || "");
const selectMonth = ref(storedInfo.dob.split("-")[1] || "");
const selectDay = ref(storedInfo.dob.split("-")[0] || "");
const month = months.months;
const years: any[] = [];
const date = days.days;
const updatedMonthArr = ref(month);
const updatedYearArr = ref(years);
const updatedDateArr = ref(date);
getYears();

async function onSubmit() {
  demographicsForm.age = handleCalculateAge(
    selectDay.value,
    selectMonth.value,
    selectYear.value
  );
  if (demographicsForm.id_number) {
    let isValid = await checkIdNumValid();
    if (isValid == "invalid") {
      return;
    }
  }

  demographicsForm.dob = `${selectDay.value}-${selectMonth.value}-${selectYear.value}`;
  userStore.onboaringAccountInfo.dob = demographicsForm.dob;
  userStore.onboaringAccountInfo.dependants = demographicsForm.dependants;
  userStore.onboaringAccountInfo.race = demographicsForm.race;
  userStore.onboaringAccountInfo.gender = demographicsForm.gender;
  userStore.onboaringAccountInfo.disability = demographicsForm.disability;
  userStore.onboaringAccountInfo.m_location = demographicsForm.location;
  userStore.onboaringAccountInfo.service_provider =
    demographicsForm.service_provider;
  userStore.onboaringAccountInfo.province = demographicsForm.province;
  userStore.onboaringAccountInfo.id_number = demographicsForm.id_number;
  userStore.onboaringAccountInfo.demographic_info =
    demographicsForm.demographic_info;
  userStore.onboaringAccountInfo.age = demographicsForm.age;
  router.push({ name: "UserWorkDetailPage" });
}

async function checkIdNumValid() {
  //YYMMDDSSSSCAZ format -> https://www.westerncape.gov.za/general-publication/decoding-your-south-african-id-number-0
  demographicsForm.dob = `${selectDay.value}-${selectMonth.value}-${selectYear.value}`;
  let monthNum = (month.indexOf(selectMonth.value) + 1).toString();
  if ((month.indexOf(selectMonth.value) + 1).toString().length == 1) {
    monthNum = monthNum.padStart(2, "0");
  }
  let dob = `${String(selectYear.value).slice(-2)}${monthNum}${
    selectDay.value
  }`;
  if (String(demographicsForm.id_number).slice(0, 6) != dob) {
    handleMessage(
      "Your date of birth(dob) and ID birthdate do not match!",
      true
    );
    return "invalid";
  }
}

/////////////////////////
//helper functions
/////////////////////////
function getYears() {
  let yearStart = new Date().getFullYear(); // - 15;
  for (var i = 0; i < 80; i++) {
    yearStart -= 1;
    years.push(yearStart.toString());
  }
}

function handleMessage(message: string, isErrorOrSuccess: boolean) {
  Notify.create({
    message: message,
    color: isErrorOrSuccess ? "red" : "green",
    icon: isErrorOrSuccess
      ? "bi-exclamation-circle-fill"
      : "bi-check-circle-fill",
    position: "top",
    actions: [{ label: "Dismiss", color: "white", handler: () => {} }],
  });
}
</script>
