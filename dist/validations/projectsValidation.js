"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProjectSchema = exports.createProjectSchema = void 0;
const yup = __importStar(require("yup"));
exports.createProjectSchema = yup.object().shape({
    org_id: yup.string().uuid().required("Organization ID is required"),
    user_id: yup.string().required("User ID is required"), // ✅ ต้องมี
    projects_name: yup.string().required("Project name is required"),
    location: yup.string().nullable(),
    phone: yup.string().nullable(),
    email: yup.string().email().nullable(),
    address: yup.string().nullable(),
    lat: yup.number().nullable(),
    lng: yup.number().nullable(),
    pin: yup
        .string()
        .min(4, "PIN ต้องมีอย่างน้อย 4 หลัก")
        .max(6, "PIN ต้องไม่เกิน 6 หลัก")
        .nullable(),
});
exports.updateProjectSchema = exports.createProjectSchema.optional();
