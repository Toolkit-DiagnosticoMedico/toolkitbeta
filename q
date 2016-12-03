                                        Table "public.sintomas"
    Column     |              Type              |                       Modifiers                       
---------------+--------------------------------+-------------------------------------------------------
 id            | integer                        | not null default nextval('sintomas_id_seq'::regclass)
 temperatura   | character varying(255)         | not null
 glucosa       | character varying(255)         | not null
 presion       | character varying(255)         | not null
 ritmocardiaco | character varying(255)         | not null
 paciente_id   | integer                        | not null
 ayudante_id   | integer                        | not null
 created_at    | timestamp(0) without time zone | not null
 updated_at    | timestamp(0) without time zone | not null
Indexes:
    "sintomas_pkey" PRIMARY KEY, btree (id)
Foreign-key constraints:
    "sintomas_ayudante_id_foreign" FOREIGN KEY (ayudante_id) REFERENCES ayudante(id) ON UPDATE CASCADE
    "sintomas_paciente_id_foreign" FOREIGN KEY (paciente_id) REFERENCES paciente(id) ON UPDATE CASCADE

