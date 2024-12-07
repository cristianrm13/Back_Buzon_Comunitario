
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../infrastructure/database/db';

interface IQuejaAttributes {
    id?: number;
    title: string;
    description: string;
    category: 'alumbrado' | 'baches' | 'limpieza' | 'seguridad';
    status: 'pendiente' | 'abierta' | 'no resuelta' | 'terminada';
    dateCreated: Date;
    userId: string; 
    imageUrl?: string;
    comentarios?: string[];
    likes: number;
    usersLiked?: string[]; 
}

interface IQuejaCreationAttributes extends Optional<IQuejaAttributes, 'id' | 'status' | 'dateCreated' | 'comentarios' | 'imageUrl' | 'usersLiked'> {}

class Queja extends Model<IQuejaAttributes, IQuejaCreationAttributes> implements IQuejaAttributes {
    static findById(quejaId: string) {
        throw new Error('Method not implemented.');
    }
    public id!: number;
    public title!: string;
    public description!: string;
    public category!: 'alumbrado' | 'baches' | 'limpieza' | 'seguridad';
    public status!: 'pendiente' | 'abierta' | 'no resuelta' | 'terminada';
    public dateCreated!: Date;
    public userId!: string;
    public imageUrl?: string;
    public comentarios?: string[];
    public likes!: number;
    public usersLiked?: string[];
}

Queja.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [3, 100],
            },
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true,
                len: [10, 500],
            },
        },
        category: {
            type: DataTypes.ENUM('alumbrado', 'baches', 'limpieza', 'seguridad'),
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pendiente', 'abierta', 'no resuelta', 'terminada'),
            allowNull: false,
            defaultValue: 'pendiente',
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
        imageUrl: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                isUrl: true, 
            },
        },
        comentarios: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        likes: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
            allowNull: false,
        },
        usersLiked: {
            type: DataTypes.JSON,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'quejas',
        modelName: 'Queja',
        timestamps: true,
        createdAt: 'dateCreated',
        updatedAt: false,
    }
);

export default Queja;



/* import mongoose, { Document, Schema } from 'mongoose';

// Interface para tipar correctamente el modelo
export interface IQueja extends Document {
    title: string;
    description: string;
    category: 'alumbrado' | 'baches' | 'limpieza' | 'seguridad';
    status: 'pendiente' | 'abierta' | 'no resuelta' | 'terminada';
    dateCreated: Date;
    userId: mongoose.Schema.Types.ObjectId;
    imageUrl?: string;
    comentarios: mongoose.Schema.Types.ObjectId[];
    likes: number;
    usersLiked: mongoose.Schema.Types.ObjectId[];
}

// Definición del esquema de Mongoose
const quejaSchema: Schema = new Schema({
    title: { 
        type: String, 
        required: true,
        trim: true, 
        maxlength: 100
    },
    description: { 
        type: String, 
        required: true,
        trim: true,
        maxlength: 500
    },
    category: {
        type: String,
        required: true,
        enum: ['alumbrado', 'baches', 'limpieza', 'seguridad'],
    },
    status: { 
        type: String, 
        default: 'pendiente',
        enum: ['pendiente', 'abierta', 'no resuelta', 'terminada'], 
    },
    dateCreated: { 
        type: Date, 
        default: Date.now 
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario', 
        //required: true 
    },
    imageUrl: { 
        type: String, 
        trim: true 
    },
    comentarios: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' }],
    likes: { 
        type: Number, 
        default: 0 
    },
    usersLiked: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Usuario' 
    }],
});

const Queja = mongoose.model<IQueja>('Queja', quejaSchema);

export default Queja;
 */

// ------------------------------------------------------------------
/* import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../../infrastructure/database/db';
import mongoose, { Document, Schema } from 'mongoose';

interface IQuejaAttributes {
    id?: number;
    title: string;
    description: string;
    category: 'alumbrado' | 'baches' | 'limpieza' | 'seguridad';
    status: 'pendiente' | 'abierta' | 'no resuelta' | 'terminada';
    dateCreated: Date;
    userId: mongoose.Schema.Types.ObjectId;
    imageUrl?: string;
    comentarios: mongoose.Schema.Types.ObjectId[];
    likes: number;
    usersLiked: mongoose.Schema.Types.ObjectId[];
}

// marcar propiedades opcionales usando Partial para el caso de `status` y `dateCreated`
interface IQuejaCreationAttributes extends Optional<IQuejaAttributes, 'id' | 'status' | 'dateCreated'> {}

class Queja extends Model<IQuejaAttributes, IQuejaCreationAttributes> implements IQuejaAttributes {
    public id!: number;
    public title!: string;
    public description!: string;
    public category!: 'alumbrado' | 'baches' | 'limpieza' | 'seguridad';
    public status!: 'pendiente' | 'abierta' | 'no resuelta' | 'terminada';
    public dateCreated!: Date;
    public userId: mongoose.Schema.Types.ObjectId;
    public imageUrl?: string; 
    public comentarios: mongoose.Schema.Types.ObjectId[];
    public likes: number;
    public usersLiked: mongoose.Schema.Types.ObjectId[];
}

Queja.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.ENUM('alumbrado', 'baches', 'limpieza', 'seguridad'),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'Pendiente',
        },
        dateCreated: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        userId: {},
        imageUrl: {},
        comentarios: {},
        likes:{},
        usersLiked:{},
    },
    {
        sequelize,
        tableName: 'quejas',
        modelName: 'Queja',
        timestamps: false,
    }
);

export default Queja; */



