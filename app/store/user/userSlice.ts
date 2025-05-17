import { RoleAccessDto } from "@/types/DTO/RoleAccess.dto";
import { createSlice } from "@reduxjs/toolkit";

export interface UserDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  userName: string;
  branchId: number;
  roles: string[];
  profileFeedback: string;
  profile: string;
  isProfileApproved: boolean;
  package?: {
    packageName: string;
    price: string;
  };
}

// Define a type for the slice state
interface IUserState {
  isAuthenticated: boolean;
  id: string | null;
  username: string;
  profile: string;
  email: string;
  branchId: number | null;
  phoneNumber: string;
  address: string;
  package: {
    name: string;
    paymentStatus: number;
    studentPackageTypeId: number;
    partnerId: number;
    price: number;
    packageTypeId: number;
  };
  isProfileApproved: boolean;
  profileFeedback: string;
  roles: string[];
  userRoles: {
    id: string;
    name: string;
  }[];
  userList: UserDto[];
  userListPageDetails: {
    totalPages: number;
  };
  useAccessList: RoleAccessDto;
}

// Define the initial state using that type
const initialState: IUserState = {
  id: null,
  username: "",
  profile: "",
  isAuthenticated: false,
  branchId: null,
  email: "",
  isProfileApproved: false,
  profileFeedback: "",
  phoneNumber: "",
  address: "",
  package: {
    name: "",
    paymentStatus: 0,
    studentPackageTypeId: 0,
    partnerId: 0,
    price: 0,
    packageTypeId: 0,
  },
  roles: [],
  userRoles: [],
  userList: [],
  userListPageDetails: {
    totalPages: 1,
  },
  useAccessList: {
    access: "",
    id: 0,
    roleId: "",
    roleName: "",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthenticated: (state, payload) => {
      state.isAuthenticated = payload.payload;
    },
    setCurrentUser: (state, { payload }) => {
      state.id = payload.id;
      state.username = payload.name;
      state.email = payload.email;
      state.phoneNumber = payload.phoneNumber;
      state.address = payload.address;
      state.isAuthenticated = payload.isAuthenticated;
      state.profile = payload.profile;
      state.roles = [...payload.roles];
      state.branchId = payload.branchId;
      state.isProfileApproved = payload.isProfileApproved;
      state.profileFeedback = payload.profileFeedback;

      // package
      state.package.name = payload.packageName;
      state.package.paymentStatus = payload.paymentStatus;
      state.package.studentPackageTypeId = payload.studentPackageTypeId;
      state.package.partnerId = payload.partnerId;
      state.package.price = payload.packagePrice;
      state.package.packageTypeId = payload.packageTypeId;
    },
    setUploadPayment: (state, payload) => {
      state.package.paymentStatus = payload.payload.paymentStatus;
    },
    setUserRoles: (state, payload) => {
      state.userRoles = [...payload.payload.data];
    },
    setUserList: (state, payload) => {
      state.userList = [...payload.payload.data];
      state.userListPageDetails = payload.payload.pageDetails;
    },
    setUserAccessList: (state, payload) => {
      state.useAccessList = payload.payload.data;
    },
    clearCurrentUser: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      state.id = null;
      state.package.name = "";
      state.profile = "";
      state.package.paymentStatus = 0;
      state.package.studentPackageTypeId = 0;
      state.package.packageTypeId = 0;
    },
  },
});

export const {
  setIsAuthenticated,
  clearCurrentUser,
  setCurrentUser,
  setUploadPayment,
  setUserRoles,
  setUserList,
  setUserAccessList,
} = userSlice.actions;

export default userSlice.reducer;
