import mongoose, { Document, Schema } from 'mongoose';

interface AuditLog extends Document {
    userId: string; 
    action: string; 
    timestamp: Date; 
    details: string;
}

const AuditLogSchema: Schema = new Schema({
    userId: { type: String, required: true },
    action: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    details: { type: String, required: true },
});

const AuditLogModel = mongoose.model<AuditLog>('AuditLog', AuditLogSchema);

export default AuditLogModel;
