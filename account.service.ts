import type { LoginResponse, MemberLogin } from "./models/member.models";
import http from "../config/apiClient";
import secure_http from "@/config/apiSecureClient";
import secure_http_file from "@/config/apiSecureClientFileProfile";
import secure_http_partner from "@/config/apiSecureClientPartner";

export default class MemberAccountService {
  async createMemberAccount(
    programID: string,
    programName: string,
    profileID: number,
    walletID: string,
    username: string,
    password: string,
    dob: string,
    gender: string,
    race: string,
    location: string,
    country: string,
    status: string,
    store_setting: number,
    task_setting: number,
    course_setting: number,
    survey_setting: number,
    verified_id: number,
    verified_email: number,
    verified_cell: number,
    custom_ref?: string
  ): Promise<any> {
    // Using axios directly because this call does not require the access token in the request header
    return http.post(`/create_account`, {
      program_id: programID,
      program_name: programName,
      profile_id: profileID,
      wallet_id: walletID,
      m_username: username,
      m_password: password,
      m_dob: dob,
      m_gender: gender,
      m_race: race,
      m_location: location,
      m_country: country,
      m_status: status,
      m_store_setting: store_setting,
      m_task_setting: task_setting,
      m_course_setting: course_setting,
      m_survey_setting: survey_setting,
      verified_id: verified_id,
      verified_email: verified_email,
      verified_cell: verified_cell,
      custom_ref: "DSI", //programName,
    });
  }

  async createDsiDetails(
    account_id: string,
    profile_id: number,
    program_id: string,
    dependants: string,
    disability: string,
    service_provider: string,
    province: string,
    highest_qualification: string,
    employment_status: string,
    employment_type: string,
    unemployment_period: string,
    work_experience: string,
    income_range: string,
    demographic_info: string,
    age: number
  ): Promise<any> {
    return http.post(`/create_dsi_details`, {
      account_id: account_id,
      profile_id: profile_id,
      program_id: program_id,
      dependants: dependants,
      disability: disability,
      service_provider: service_provider,
      province: province,
      highest_qualification: highest_qualification,
      employment_status: employment_status,
      employment_type: employment_type,
      unemployment_period: unemployment_period,
      work_experience: work_experience,
      income_range: income_range,
      demographic_info: demographic_info,
      age: age,
    });
  }

  async loginMemberAccount(loginParams: MemberLogin): Promise<LoginResponse> {
    return http.post("/account_login", loginParams);
  }

  async updatePassword(payload: {
    account_id: string;
    new_account_password_info: string;
    account_username: string;
  }): Promise<any> {
    return secure_http.put(
      `/complete_update_password_reset/${payload.account_id}`,
      {
        account_username: payload.account_username,
        password: payload.new_account_password_info,
      }
    );
  }

  async usernameCheck(payload: { account_username: string }): Promise<any> {
    return secure_http.post(
      `/account_username_check?account_username=${payload.account_username}`
    );
  }

  async accountWalletUpdate(
    account_id: string,
    wallet_id: string
  ): Promise<any> {
    return secure_http.put(`account_wallet_update/${account_id}`, {
      wallet_id: wallet_id,
    });
  }

  async createMemberProfile(payload: {
    memberID: string;
    mainProgramID: string;
    firstName: string;
    lastName: string;
    bio: string;
    IDNumber: string;
    phoneNumber: string;
    userName: string;
    avatar: string;
    status: string;
    account_status: string;
    date_created?: Date;
  }): Promise<any> {
    return secure_http.post(`/create_profiles`, {
      member_id: payload.memberID,
      main_program_id: payload.mainProgramID,
      first_name: payload.firstName,
      last_name: payload.lastName,
      bio: payload.bio,
      id_number: payload.IDNumber,
      phone_number: payload.phoneNumber,
      username: payload.userName,
      avatar: payload.avatar,
      status: payload.status,
      account_status: payload.account_status,
      date_created: payload.date_created,
    });
  }

  async updateMemberProfile(payload: {
    profileID: number;
    memberID: string;
    mainProgramID: string;
    firstName: string;
    lastName: string;
    bio: string;
    IDNumber: string;
    phoneNumber: string;
    userName: string;
    avatar: string;
    status: string;
  }): Promise<any> {
    return secure_http.put(`/update_profile/${payload.profileID}`, {
      member_id: payload.memberID,
      main_program_id: payload.mainProgramID,
      first_name: payload.firstName,
      last_name: payload.lastName,
      bio: payload.bio,
      id_number: payload.IDNumber,
      phone_number: payload.phoneNumber,
      username: payload.userName,
      avatar: payload.avatar,
      status: payload.status,
    });
  }

  //get_program
  async getAccountProgram(slug: string): Promise<any> {
    return secure_http_partner.get(
      `/get_program_details_by_signup_slug/${slug}`
    );
  }

  async getAllMemberLogs(
    memberID: string,
    limit?: number,
    offset?: number
  ): Promise<any> {
    return secure_http.get(`/get_all_logs_by_user/${memberID}`, {
      params: {
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
      },
    });
  }

  async uploadMemberProfileAvatar(payload: {
    profileID: number;
    avatar: any;
  }): Promise<any> {
    return secure_http_file.post(
      `/upload_profile_avatar/${payload.profileID}`,
      {
        file: payload.avatar,
      }
    );
  }

  async uploadMemberDocs(payload: {
    profileID: string;
    document: any;
    doc_type: string;
  }): Promise<any> {
    return secure_http_file.post(
      `/upload_zlto_docs/${payload.profileID}?doc_type=${payload.doc_type}`,
      {
        file: payload.document,
      }
    );
  }

  async createPasswordResetRequest(payload: {
    username: string;
    resetType: string;
  }): Promise<any> {
    return http.post(`/create_password_reset`, {
      account_username: payload.username,
      reset_type: payload.resetType,
    });
  }

  async accountPasswordUpdateRequest(payload: {
    resetpassword: string;
  }): Promise<any> {
    return http.put(`/account_password_update`, {
      account_password: payload.resetpassword,
    });
  }

  async createVerificationRequest(payload: {
    username: string;
    resetType: string;
  }): Promise<any> {
    return http.post(`/create_verification`, {
      v_contact: payload.username,
      v_contact_type: payload.resetType,
    });
  }

  async getVerificationRequest(verificationID: string): Promise<any> {
    return http.get(`/get_verification/${verificationID}`);
  }

  async completeVerificationRequest(payload: {
    verificationID: string;
    verificationCode: string;
  }): Promise<any> {
    return http.put(`/complete_update_verification/${payload.verificationID}`, {
      v_code: payload.verificationCode,
    });
  }

  async createMemberMigration(payload: {
    member_id: string;
    legacy_user_uuid: string;
    legacy_user_bank_account_id: number;
    legacy_people_impacted: string;
    legacy_total_hours: string;
    legacy_partner_name: string;
    legacy_partner_id: number;
    date_created: string;
  }): Promise<any> {
    return secure_http.post(`/create_member_migration`, {
      member_id: payload.member_id,
      legacy_user_uuid: payload.legacy_user_uuid,
      legacy_user_bank_account_id: payload.legacy_user_bank_account_id,
      legacy_people_impacted: payload.legacy_people_impacted,
      legacy_total_hours: payload.legacy_total_hours,
      legacy_partner_name: payload.legacy_partner_name,
      legacy_partner_id: payload.legacy_partner_id,
      date_created: payload.date_created,
    });
  }

  async getProfiles(limit?: number, offset?: number): Promise<any> {
    return http.get(`/get_profiles_avatars`, {
      params: {
        limit: limit ? limit : 3,
        offset: offset ? offset : 0,
      },
    });
  }

  /////////////////
  // HANDLE ACC VERIFICATION
  /////////////////

  //update cell otp
  async updateCellOTP(profileID: string): Promise<any> {
    return secure_http.put(`/update_cell_otp_status/${profileID}`, {
      account_id: profileID,
    });
  }

  //update email otp
  async updateEmailOTP(profileID: string): Promise<any> {
    return secure_http.put(`/update_email_otp_status/${profileID}`, {
      account_id: profileID,
    });
  }

  //handle id upload
  //NOTE: takes username/email as member_id

  async uploadID(payload: {
    member_id: string;
    doc_content_type: string;
    doc_type: string;
    doc_link: string;
    date_created?: string;
  }): Promise<any> {
    return http.post(`/member_doc_id`, {
      member_id: payload.member_id,
      doc_content_type: payload.doc_content_type,
      doc_type: payload.doc_type,
      doc_link: payload.doc_link,
      date_created: payload.date_created,
    });
  }

  async getAllMemberDocsByMemberID(
    member_id: string,
    limit?: number,
    offset?: number
  ): Promise<any> {
    return secure_http.get(`/get_all_member_docs_by_member_id`, {
      params: {
        member_id: member_id,
        limit: limit ? limit : 10,
        offset: offset ? offset : 0,
      },
    });
  }
}
