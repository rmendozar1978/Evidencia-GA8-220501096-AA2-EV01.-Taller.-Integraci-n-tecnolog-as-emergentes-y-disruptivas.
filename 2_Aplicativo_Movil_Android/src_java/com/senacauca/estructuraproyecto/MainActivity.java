package com.senacauca.estructuraproyecto;

import android.content.Intent;
import android.media.MediaPlayer;
import android.net.Uri;
import android.os.Bundle;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;
import android.widget.VideoView;
import android.widget.MediaController;

import androidx.appcompat.app.AppCompatActivity;

/**
 * Actividad Principal desarrollada siguiendo el componente formativo:
 * "Construir aplicativo según las características de la arquitectura Android"
 * Evidencia: SENA GA8-220501096-AA2-EV01
 */
public class MainActivity extends AppCompatActivity {

    // Declaración de Views (Controles Básicos)
    private Button btnclic;
    private TextView txtTexto;
    private ImageView imgAndy;
    private EditText txtNombre;
    private CheckBox chkEspanol, chkIngles;
    private RadioGroup rgGenero;
    private RadioButton rbFemenino, rbMasculino;
    private Spinner spCiudades;
    private ListView listaCiudades;

    // Multimedia
    private MediaPlayer cancion;
    private VideoView videoView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // 1. Referenciar controles por Id con findViewById (Pág 48 PDF 2)
        btnclic = findViewById(R.id.btnclic);
        txtTexto = findViewById(R.id.txtTexto);
        imgAndy = findViewById(R.id.imgAndy);
        txtNombre = findViewById(R.id.txtNombre);
        chkEspanol = findViewById(R.id.chkEspanol);
        chkIngles = findViewById(R.id.chkIngles);
        rgGenero = findViewById(R.id.rg1);
        rbFemenino = findViewById(R.id.rb1);
        rbMasculino = findViewById(R.id.rb2);
        spCiudades = findViewById(R.id.spCiudades);
        listaCiudades = findViewById(R.id.listaCiudades);

        // 2. Implementar evento Listener en Botón (Pág 50 PDF 2)
        btnclic.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                String nombreIngresado = txtNombre.getText().toString();
                if (nombreIngresado.isEmpty()) {
                    nombreIngresado = "Aprendiz SENA";
                }
                String mensaje = "¡Hola, " + nombreIngresado + "! Botón presionado con éxito.";
                Toast.makeText(MainActivity.this, mensaje, Toast.LENGTH_SHORT).show();
                txtTexto.setText("Selección: " + nombreIngresado);
            }
        });

        // 3. Listener en Spinner de Ciudades (Pág 41-42 PDF 2)
        if (spCiudades != null) {
            spCiudades.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
                @Override
                public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                    String ciudadSeleccionada = parent.getItemAtPosition(position).toString();
                    Toast.makeText(MainActivity.this, "Ciudad seleccionada: " + ciudadSeleccionada, Toast.LENGTH_SHORT).show();
                }

                @Override
                public void onNothingSelected(AdapterView<?> parent) { }
            });
        }

        // 4. Listener en ListView de Ciudades (Pág 43-44 PDF 2)
        if (listaCiudades != null) {
            listaCiudades.setOnItemClickListener(new AdapterView.OnItemClickListener() {
                @Override
                public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                    String ciudad = (String) parent.getItemAtPosition(position);
                    Toast.makeText(MainActivity.this, "ListView: Elegiste " + ciudad, Toast.LENGTH_SHORT).show();
                }
            });
        }
    }

    // 5. Navegación con Intent Explícito (Pág 51 PDF 2)
    public void abrirSegundaPantalla(View view) {
        Intent intent = new Intent(MainActivity.this, DetalleActivity.class);
        intent.putExtra("MENSAJE", "Datos transferidos desde MainActivity");
        startActivity(intent);
    }

    // 6. Navegación con Intent Implícito (Pág 52-53 PDF 2)
    public void abrirNavegadorWeb(View view) {
        Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("https://zajuna.sena.edu.co"));
        startActivity(intent);
    }

    // 7. Reproducción de Audio con MediaPlayer (Pág 63-65 PDF 2)
    public void reproducirSonido(View view) {
        try {
            if (cancion == null) {
                cancion = MediaPlayer.create(this, R.raw.bruja);
            }
            cancion.start();
            Toast.makeText(this, "Reproduciendo audio con MediaPlayer", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Audio ejecutado correctamente", Toast.LENGTH_SHORT).show();
        }
    }

    // 8. Reproducción de Video con VideoView (Pág 65-66 PDF 2)
    public void iniciarVideo(View view) {
        videoView = findViewById(R.id.videoview);
        if (videoView != null) {
            videoView.setVideoPath("android.resource://" + getPackageName() + "/" + R.raw.video);
            videoView.setMediaController(new MediaController(this));
            videoView.start();
            Toast.makeText(this, "Iniciando VideoView", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        if (cancion != null) {
            cancion.release();
            cancion = null;
        }
    }
}
