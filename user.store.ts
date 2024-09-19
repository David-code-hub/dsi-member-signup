import type {
  UserDetails,
  CurrentAccountDetails,
  Profile,
} from "@/services/models/member.models";
import type { Wallet } from "@/services/models/wallet.models";
import { defineStore } from "pinia";

interface AccountState {
  accessToken: string;
  currentAccount: CurrentAccountDetails;
  onboaringAccountInfo: UserDetails;
  wallet: Wallet;
  profile: Profile;
  refreshToken: string;
  walletConnected: boolean;
  currentItemCart: {};
  notification_count: number;
  // fileUploadProgress: number;
}

export const useUserStore = defineStore("UserStore", {
  state: (): AccountState => ({
    // fileUploadProgress:0,
    accessToken: "",
    currentAccount: {
      date_created: "",
      last_login: "",
      m_country: "",
      m_dob: "",
      m_gender: "",
      m_location: "",
      m_password: "",
      m_race: "",
      m_status: "",
      m_username: "",
      member_id: "",
      profile_id: 0,
      program_id: "",
      program_name: "",
      wallet_id: "",
      temp_account_balance: 0,
      external_account_id: "",
      owner_id: "",
      owner_name: "",
      owner_origin: "",
      m_store_setting: 2,
      m_task_setting: 2,
      m_course_setting: 2,
      m_survey_setting: 2,
      m_member_setting: "",
      verified_id: 0,
      verified_email: 0,
      verified_cell: 0,
    },
    onboaringAccountInfo: {
      name: "",
      surname: "",
      email_address: "",
      cell_number: "",
      dob: "",
      id_number: "",
      gender: "",
      country_of_residence: "",
      postal_code: "",
      profile_picture: "",
      race: "",
      password: "",
      verified_id: 0,
      verified_email: 0,
      verified_cell: 0,
      dependants: "",
      disability: "",
      service_provider: "",
      province: "",
      highest_qualification: "",
      employment_status: "",
      employment_type: "",
      unemployment_period: "",
      work_experience: "",
      income_range: "",
      m_location: "",
      demographic_info: "",
      age: 0,
    },
    walletConnected: false,
    wallet: {
      date_created: "",
      last_updated: "",
      owner_id: "",
      wallet_id: "",
      wallet_location: "",
      wallet_name: "",
      wallet_owner_type: "",
      wallet_state: 0,
      zlto_balance: 0,
      zlto_rewards: 0,
    },
    notification_count: 0,
    profile: {
      avatar: "",
      bio: "",
      first_name: "",
      id_number: "",
      last_name: "",
      main_program_id: "",
      member_id: "",
      member_profile_id: 0,
      phone_number: "",
      status: "",
      username: "",
    },
    refreshToken: "",
    currentItemCart: {},
  }),
  getters: {
    getUserVerificationLevel: (state) => {
      return (
        state.currentAccount.verified_id +
        state.currentAccount.verified_email +
        state.currentAccount.verified_cell
      );
    },
    getNotificationCount: (state) => state.notification_count || 0,
    // getFileUploadProgress: (state) => state.fileUploadProgress || 0,
    getUserProfileCompletion: (state) => {
      if (
        !state.profile.avatar ||
        !state.profile.bio ||
        !state.profile.phone_number ||
        !state.profile.first_name ||
        !state.profile.last_name
      ) {
        return false;
      } else {
        return true;
      }
    },
    getItemCart: (state) => state.currentItemCart,
    isWalletConnected: (state) => state.walletConnected,
    getWalletBalance: (state) => state.wallet?.zlto_balance || 0,
    getCurrentAccount: (state) => state.currentAccount,
    getAccessToken: (state) => state.accessToken,
    getAccountInfo: (state) => state.onboaringAccountInfo,
    getRefreshToken: (state) => state.refreshToken,
    getCellNumber: (state) => state.onboaringAccountInfo.cell_number,
    getEmailAddress: (state) => state.onboaringAccountInfo.email_address,
    getProfile: (state) => {
      return {
        bio: state.profile.bio,
        avatar: state.profile.avatar,
        name: state.profile.first_name,
        surname: state.profile.last_name,
        username: state.profile.username,
        cellNumber: state.profile.phone_number,
        dateOfBirth: state.currentAccount.m_dob,
        race: state.currentAccount.m_race,
        IDNumber: state.profile.id_number,
        gender: state.currentAccount.m_gender,
        country: state.currentAccount.m_location,
        verified_id: state.currentAccount.verified_id,
        verified_email: state.currentAccount.verified_email,
        verified_cell: state.currentAccount.verified_cell,
      };
    },
    getProgramDetails: (state) => {
      return {
        program_id: state.currentAccount.program_id,
        program_name: state.currentAccount.program_name,
        store_setting: state.currentAccount.m_store_setting,
        task_setting: state.currentAccount.m_task_setting,
        survey_setting: state.currentAccount.m_survey_setting,
        course_setting: state.currentAccount.m_course_setting,
        member_setting: state.currentAccount.m_member_setting,
      };
    },
  },
  actions: {
    setItemCart(item: object) {
      this.currentItemCart = item;
    },
    updateWalletBalance(newBalance: number) {
      this.wallet.zlto_balance = newBalance;
    },
    updateNotificationCount(notification_count: number) {
      this.notification_count = notification_count;
    },
    // updateFileUploadProgress(percentage: number) {
    //   this.fileUploadProgress = percentage;
    // },
    setProgramDetails(
      id: string,
      program_name: string,
      store_setting: number,
      task_setting: number,
      survey_setting: number,
      course_setting: number,
      m_member_setting: string
    ) {
      this.currentAccount.program_id = id;
      this.currentAccount.program_name = program_name;
      this.currentAccount.m_store_setting = store_setting;
      this.currentAccount.m_task_setting = task_setting;
      this.currentAccount.m_course_setting = course_setting;
      this.currentAccount.m_survey_setting = survey_setting;
      this.currentAccount.m_member_setting = m_member_setting;
    },
    setAccessToken(token: string) {
      this.accessToken = token;
    },
    setWalletConnected() {
      this.walletConnected = true;
    },
    reset() {
      this.accessToken = "";
      this.currentAccount = {
        date_created: "",
        last_login: "",
        m_country: "",
        m_dob: "",
        m_gender: "",
        m_location: "",
        m_password: "",
        m_race: "",
        m_status: "",
        m_username: "",
        member_id: "",
        profile_id: 0,
        program_id: "",
        program_name: "",
        wallet_id: "",
        temp_account_balance: 0,
        external_account_id: "",
        owner_id: "",
        owner_name: "",
        owner_origin: "",
        m_store_setting: 2,
        m_task_setting: 2,
        m_course_setting: 2,
        m_survey_setting: 2,
        m_member_setting: "",
        verified_id: 0,
        verified_email: 0,
        verified_cell: 0,
      };
      this.onboaringAccountInfo = {
        name: "",
        surname: "",
        email_address: "",
        cell_number: "",
        dob: "",
        id_number: "",
        gender: "",
        country_of_residence: "",
        postal_code: "",
        profile_picture: "",
        race: "",
        password: "",
        verified_id: 0,
        verified_email: 0,
        verified_cell: 0,
        //dsi_member_data
        dependants: "",
        disability: "",
        service_provider: "",
        province: "",
        highest_qualification: "",
        employment_status: "",
        employment_type: "",
        unemployment_period: "",
        work_experience: "",
        income_range: "",
        m_location: "",
        demographic_info: "",
        age: 0,
      };
      this.wallet = {
        date_created: "",
        last_updated: "",
        owner_id: "",
        wallet_id: "",
        wallet_location: "",
        wallet_name: "",
        wallet_owner_type: "",
        wallet_state: 0,
        zlto_balance: 0,
        zlto_rewards: 0,
      };
      this.profile = {
        avatar: "",
        bio: "",
        first_name: "",
        id_number: "",
        last_name: "",
        main_program_id: "",
        member_id: "",
        member_profile_id: 0,
        phone_number: "",
        status: "",
        username: "",
      };
      this.refreshToken = "";
    },
    saveAccountDetails(
      access_token: string,
      account_info: CurrentAccountDetails,
      refresh_token: string,
      profile: Profile
    ) {
      this.accessToken = access_token;
      this.refreshToken = refresh_token;
      this.currentAccount = account_info;
      this.profile = profile;
    },
    saveWalletDetails(wallet: Wallet) {
      this.wallet = wallet;
      this.currentAccount.wallet_id = wallet.wallet_id;
    },
    saveProfileDetails(profile: Profile) {
      this.profile = profile;
    },
  },
  persist: true,
});
