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

.terms-and-condtitions {
  text-align: center;
}

.terms-and-condtitions p {
  font-size: 10px;
}

.terms-and-condtitions a {
  color: #fdb417;
}

.terms-and-condtitions a:hover {
  background: none;
}
</style>
<template>
  <q-form @submit="onSubmit" class="q-gutter-md">
    <div>
      <Logo></Logo>
    </div>
    <p class="text-right text-primary text-12px">5/5</p>
    <q-linear-progress
      rounded
      size="6px"
      :value="1"
      color="primary"
      class="q-mt-sm"
    />

    <div class="form-element col-6">
      <p class="q-mb-sm">Bio</p>
      <q-input
        outlined
        v-model="createPasswordForm.bio"
        type="textarea"
        placeholder="Give a brief overview of who you are."
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />
    </div>

    <div class="row q-mt-none">
      <div class="col-12">
        <p class="label">Create a password</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Create a password with atleast 6 characters.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          v-model="createPasswordForm.password"
          outlined
          :type="isPwd ? 'password' : 'text'"
          placeholder="Password"
          lazy-rules
          :rules="[
            (val) =>
              (val && val.length >= 6) || 'Minimum of 6 letters is required',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="bi-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mt-none">
      <div class="col-12">
        <p class="label">Confirm password</p>
      </div>
      <div class="col-12">
        <p class="sub-label">Enter your password again to confirm.</p>
      </div>
    </div>
    <div class="row">
      <div class="form-element col-12">
        <q-input
          v-model="createPasswordForm.confirm_password"
          outlined
          :type="isConfirmPwd ? 'password' : 'text'"
          placeholder="Confirm Password"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type something',
            (val) =>
              val == createPasswordForm.password || 'Passwords do not match!',
          ]"
        >
          <template v-slot:prepend>
            <q-icon name="bi-lock" />
          </template>
          <template v-slot:append>
            <q-icon
              :name="isConfirmPwd ? 'bi-eye-slash-fill' : 'bi-eye-fill'"
              class="cursor-pointer"
              @click="isConfirmPwd = !isConfirmPwd"
            />
          </template>
        </q-input>
      </div>
    </div>
    <div class="row q-mt-none">
      <div class="form-element col-12">
        <q-checkbox
          v-model="agreementForm.terms_and_conditions"
          color="primary"
        ></q-checkbox
        >Agree to
        <a
          target="_blank"
          href="https://app.enzuzo.com/policies/eula/249f08ae-4e1f-11ee-b024-2b84a22eb948"
          >Terms and Conditions</a
        >
      </div>
      <div class="form-element col-12">
        <q-checkbox
          v-model="agreementForm.privacy_policy"
          color="primary"
        ></q-checkbox
        >Agree to
        <a
          href="https://app.enzuzo.com/policies/privacy/249f08ae-4e1f-11ee-b024-2b84a22eb948"
          target="_blank"
          >Privacy Policy</a
        >
      </div>
    </div>
    <div class="row">
      <div class="button-wrapper col-12">
        <q-btn
          unelevated
          :disable="
            !agreementForm.terms_and_conditions ||
            !agreementForm.privacy_policy ||
            createPasswordForm.password !==
              createPasswordForm.confirm_password ||
            createPasswordForm.bio == ''
          "
          :loading="loadingbtn"
          :no-caps="true"
          class="form-btn"
          label="Agree and Signup"
          type="submit"
          color="primary"
        />
      </div>
    </div>
    <p class="text-14px text-center q-mt-md text-weight-medium">
      Your data and information provided on Zlto is handled in accordance to the
      POPI Act
    </p>
    <q-dialog v-model="loadingbtn" maximized>
      <q-card class="text-center">
        <div class="vertically-center">
          <q-card-section>
            <img
              src="@/assets/logo.png"
              alt="Zlto-logo"
              style="
                height: 4rem;
                border-radius: 50% !important;
                border: 1px solid;
              "
              class="q-pa-md zlto-bg-light zlto-color rounded-lg q-mx-auto q-mb-lg flip"
            />
            <div class="text-h6 text-black">{{ loadingText }}</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <span v-if="loadingText.includes('account')">1</span>
            <span v-if="loadingText.includes('profile')">2</span>
            <span v-if="loadingText.includes('details')">3</span>

            of 3 steps
          </q-card-section>

          <!-- <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions> -->
        </div>
      </q-card>
    </q-dialog>
  </q-form>
</template>
<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user.store";
import MemberAccountService from "@/services/account.service";
import { Notify } from "quasar";

const memberAccountService = new MemberAccountService();
const userStore = useUserStore();
const userAccountInfo = userStore.getAccountInfo;
const getprogramDetails = userStore.getProgramDetails;
const programID = getprogramDetails.program_id;
const memberID = ref("");
const onboardingUserDetails: any = ref([]);
const programName = getprogramDetails.program_name;
const profileID = ref(2);
const walletID = "None";
const race = userStore.onboaringAccountInfo.race;
const status = getprogramDetails.member_setting || "verified";
console.log("program member setting :", status);
const userName = userAccountInfo.email_address;
const loadingbtn = ref(false);
const loadingText = ref("Creating your account...");

const isPwd = ref(true);
const isConfirmPwd = ref(true);
const createPasswordForm = reactive({
  password: "",
  confirm_password: "",
  bio: "",
});
const agreementForm = reactive({
  terms_and_conditions: false,
  privacy_policy: false,
});

async function onSubmit() {
  loadingbtn.value = true;
  userStore.onboaringAccountInfo.password = createPasswordForm.password;

  await createMemberAccount();
  await createProfile();
  await createDsiDetails();
  loadingbtn.value = false;

  // router.push({ name: "Login" });
}

async function createMemberAccount() {
  await memberAccountService
    .createMemberAccount(
      programID,
      programName,
      profileID.value,
      walletID,
      userName,
      userAccountInfo.password,
      userAccountInfo.dob,
      userAccountInfo.gender,
      race,
      userAccountInfo.postal_code,
      userAccountInfo.country_of_residence,
      status,
      getprogramDetails.store_setting,
      getprogramDetails.task_setting,
      getprogramDetails.course_setting,
      getprogramDetails.survey_setting,
      userAccountInfo.verified_id,
      userAccountInfo.verified_email,
      userAccountInfo.verified_cell
    )
    .then((response: any) => {
      userStore.saveAccountDetails(
        response.data.access_token,
        response.data.account_info,
        response.data.refresh_token,
        response.data.profile_info
      );
      onboardingUserDetails.value = userStore.onboaringAccountInfo;
      memberID.value = response.data.account_info.member_id;
      console.log("account", onboardingUserDetails.value, memberID.value);
    })
    .catch((error: any) => {
      handleMessage("Error occured while creating your account!", true);
      console.log("profile error", error);
      loadingbtn.value = false;
      throw "Error occured while creating your account.";
    });
}

async function createProfile() {
  loadingText.value = "Creating your profile...";
  const payload = {
    memberID: memberID.value,
    mainProgramID: programID,
    firstName: onboardingUserDetails.value.name,
    lastName: onboardingUserDetails.value.surname,
    bio: createPasswordForm.bio,
    IDNumber: onboardingUserDetails.value.id_number,
    phoneNumber: onboardingUserDetails.value.cell_number,
    userName: userName,
    avatar: "",
    status: "blank",
    account_status: "active",
    date_created: new Date(),
  };
  await memberAccountService
    .createMemberProfile(payload)
    .then((CreateProfileResponse: any) => {
      if (CreateProfileResponse.status == 200) {
        profileID.value = CreateProfileResponse.data.member_profile_id;
        console.log(
          "profile-created-info",
          CreateProfileResponse.data,
          profileID.value
        );
      }
    })
    .catch((error: any) => {
      handleMessage("Error occured while creating your profile!", true);
      console.log("profile error", error);
      loadingbtn.value = false;
      throw "Error occured while creating your profile.";
    });
}

async function createDsiDetails() {
  loadingText.value = "Saving your details...";
  console.log("onboarding dsi details :", userStore.onboaringAccountInfo);
  await memberAccountService
    .createDsiDetails(
      memberID.value,
      profileID.value ?? 1,
      programID,
      userStore.onboaringAccountInfo.dependants,
      userStore.onboaringAccountInfo.disability,
      userStore.onboaringAccountInfo.service_provider,
      userStore.onboaringAccountInfo.province,
      userStore.onboaringAccountInfo.highest_qualification,
      userStore.onboaringAccountInfo.employment_status,
      userStore.onboaringAccountInfo.employment_type,
      userStore.onboaringAccountInfo.unemployment_period,
      userStore.onboaringAccountInfo.work_experience,
      userStore.onboaringAccountInfo.income_range,
      userStore.onboaringAccountInfo.demographic_info,
      userStore.onboaringAccountInfo.age
    )
    .then((CreateProfileResponse: any) => {
      if (CreateProfileResponse.status == 200) {
        handleMessage("You have successfully registered!", false);
        userStore.reset();
        // router.push({ name: "Login" });
        window.location.replace("https://zlto.mobi/");
        loadingbtn.value = false;
      }
    })
    .catch((error: any) => {
      handleMessage("Error occured while creating dsi info!", true);
      console.log("dsi error", error);
      loadingbtn.value = false;
      throw "Error occured while creating dsi info.";
    });
}

//helper functions
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
