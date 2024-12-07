import mongoose, { Document, Schema } from 'mongoose';

export interface IComentario extends Document {
    content: string; 
    userId: mongoose.Schema.Types.ObjectId;
    quejaId: mongoose.Schema.Types.ObjectId;
    dateCreated: Date;
}

const comentarioSchema: Schema = new Schema({
    content: { type: String, required: true, trim: true, maxlength: 500 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    quejaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Queja', required: true },
    dateCreated: { type: Date, default: Date.now },
});

const Comentario = mongoose.model<IComentario>('Comentario', comentarioSchema);

export default Comentario;
