package com.senacauca.estructuraproyecto;

import android.content.Context;
import android.database.sqlite.SQLiteDatabase;
import android.database.sqlite.SQLiteOpenHelper;
import androidx.annotation.Nullable;

/**
 * Gestor de persistencia en Base de Datos Local SQLite
 * Componente formativo: Construir aplicativo según las características de la arquitectura Android (Págs 56-57)
 */
public class AdminSQLiteOpenHelper extends SQLiteOpenHelper {

    private static final String DATABASE_NAME = "administracion.db";
    private static final int DATABASE_VERSION = 1;

    public AdminSQLiteOpenHelper(@Nullable Context context) {
        super(context, DATABASE_NAME, null, DATABASE_VERSION);
    }

    @Override
    public void onCreate(SQLiteDatabase db) {
        // Creación de tabla usuarios/empleados mediante sentencia SQL con db.execSQL
        db.execSQL("CREATE TABLE usuarios (" +
                "cedula INT PRIMARY KEY, " +
                "nombre TEXT, " +
                "cargo TEXT, " +
                "telefono TEXT)");
    }

    @Override
    public void onUpgrade(SQLiteDatabase db, int oldVersion, int newVersion) {
        db.execSQL("DROP TABLE IF EXISTS usuarios");
        onCreate(db);
    }
}
