<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Quarter;
class QuarterController extends Controller
{
    public function all(){
        try {
            $response = [
                'message'=> 'Lista de quarters',
                'quarters' => Quarter::all(),
            ];
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
                'error' => $e->getMessage(),
                'linea' => $e->getLine()
            ], 500);
        }
    }  
    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'name'                         => 'required|string|max:45|unique:quarters',
            'number_plants'                => 'required|integer',
            'number_plants_equivalent'     => 'required|integer',
            'number_plants_ha'             => 'required|integer',
            'number_plants_equivalent_ha'  => 'required|integer',
            'number_clusters_desired'      => 'required|integer',
            'number_clusters_ha'           => 'required|integer',
            'number_clusters_for_quarters' => 'required|integer',
            'description'                  => 'required|string',
            'hectareas'                    => 'required|string',
            'variety'                      => 'required|string',
            'portainjerto'                 => 'required|string',
            'id_farm'                      => 'required'
        ],[
            'name.required'                         => 'El nombre es requerido',
            'name.unique'                           => 'Ya existe un cuartel con el nombre',
            'name.max'                              => 'El nombre debe contener como máximo 45 caracteres',
            'number_plants.required'                => 'El number_plants es requerido', 
            'number_plants.integer'                 => 'El number_plants debe ser un número entero',
            'number_plants_equivalent.required'     => 'El number_plants_equivalent es requerido',
            'number_plants_equivalent.integer'      => 'El number_plants_equivalent debe ser un número entero',
            'number_plants_ha.required'             => 'El number_plants_ha es requerido', 
            'number_plants_ha.integer'              => 'El number_plants_ha debe ser un número entero',
            'number_plants_equivalent_ha.required'  => 'El number_plants_equivalent_ha es requerido',
            'number_plants_equivalent_ha.integer'   => 'El number_plants_equivalent_ha debe ser un número entero',
            'number_clusters_desired.required'      => 'El number_clusters_desired es requerido',
            'number_clusters_desired.integer'       => 'El number_clusters_desired debe ser un número entero',
            'number_clusters_ha.required'           => 'El number_clusters_ha es requerido',
            'number_clusters_ha.integer'            => 'El number_clusters_ha debe ser un número entero',
            'number_clusters_for_quarters.required' => 'El number_clusters_for_quarters es requerido',
            'number_clusters_for_quarters.integer'  => 'El number_clusters_for_quarters debe ser un número entero',
            'description.required'                  => 'La descripción es requerida',
            'hectareas.required'                    => 'La hectareas es requerida',
            'variety.required'                      => 'La variedad es requerida',
            'portainjerto.required'                 => 'El portainjerto es requerido',
            'id_farm'                               => 'Debe seleccionar un campo'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }

        $quarter = Quarter::create([
            'name' => $request->get('name'),
            'number_plants' => $request->get('number_plants'),
            'number_plants_equivalent' => $request->get('number_plants_equivalent'),
            'number_plants_ha' => $request->get('number_plants_ha'),
            'number_plants_equivalent_ha' => $request->get('number_plants_equivalent_ha'),
            'number_clusters_desired' => $request->get('number_clusters_desired'),
            'number_clusters_ha' => $request->get('number_clusters_ha'),
            'number_clusters_for_quarters' => $request->get('number_clusters_for_quarters'),
            'description' => $request->get('description'),
            'hectareas' => $request->get('hectareas'),
            'variety' => $request->get('variety'),
            'portainjerto' => $request->get('portainjerto'),
            'id_farm' => intval($request->get('id_farm'))
        ]);
        $response = [
            'message'=> 'Quarter registrado satisfactoriamente',
            'quarter' => $quarter,
        ];
        return response()->json($response, 200);
    } 
    public function get($id){
        try {
            $quarter = Quarter::find($id);
            if(is_null($quarter)){
                return response()->json(["message"=>"Quarter no existente"],404);
            }
            $response = [
                'message'=> 'Cuartel encontrado satisfactoriamente',
                'quarter' => $quarter,
            ];
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de obtener los datos.',
                'error' => $e->getMessage(),
                'linea' => $e->getLine()
            ], 500);
        }
    }
    public function update(Request $request,$id){
        $validator = Validator::make($request->all(), [
            'name'                         => 'required|string|max:45',
            'number_plants'                => 'required|integer',
            'number_plants_equivalent'     => 'required|integer',
            'number_plants_ha'             => 'required|integer',
            'number_plants_equivalent_ha'  => 'required|integer',
            'number_clusters_desired'      => 'required|integer',
            'number_clusters_ha'           => 'required|integer',
            'number_clusters_for_quarters' => 'required|integer',
            'description'                  => 'required|string',
            'hectareas'                    => 'required|string',
            'variety'                      => 'required|string',
            'portainjerto'                 => 'required|string'
        ],[
            'name.required'                         => 'El nombre es requerido',
            'name.max'                              => 'El nombre debe contener como máximo 45 caracteres',
            'number_plants.required'                => 'El number_plants es requerido', 
            'number_plants.integer'                 => 'El number_plants debe ser un número entero',
            'number_plants_equivalent.required'     => 'El number_plants_equivalent es requerido',
            'number_plants_equivalent.integer'      => 'El number_plants_equivalent debe ser un número entero',
            'number_plants_ha.required'             => 'El number_plants_ha es requerido', 
            'number_plants_ha.integer'              => 'El number_plants_ha debe ser un número entero',
            'number_plants_equivalent_ha.required'  => 'El number_plants_equivalent_ha es requerido',
            'number_plants_equivalent_ha.integer'   => 'El number_plants_equivalent_ha debe ser un número entero',
            'number_clusters_desired.required'      => 'El number_clusters_desired es requerido',
            'number_clusters_desired.integer'       => 'El number_clusters_desired debe ser un número entero',
            'number_clusters_ha.required'           => 'El number_clusters_ha es requerido',
            'number_clusters_ha.integer'            => 'El number_clusters_ha debe ser un número entero',
            'number_clusters_for_quarters.required' => 'El number_clusters_for_quarters es requerido',
            'number_clusters_for_quarters.integer'  => 'El number_clusters_for_quarters debe ser un número entero',
            'description.required'                  => 'La descripción es requerida',
            'hectareas.required'                    => 'La hectareas es requerida',
            'variety.required'                      => 'La variedad es requerida',
            'portainjerto.required'                 => 'El portainjerto es requerido'
        ]);
        if($validator->fails()){
            return response()->json($validator->errors(), 400);
        }
        try {
            $quarter = Quarter::find($id);
            if(is_null($quarter)){
                return response()->json(["message"=>"Quarter no existente"],404);
            }
            $quarter->fill($request->all());
            $response = [
                'message'=> 'Quarter actualizado satisfactoriamente',
                'quarter' => $quarter,
            ];
            $quarter->update();
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de guardar los datos.',
                'error' => $e->getMessage(),
                'linea' => $e->getLine()
            ], 500);
        }
    }
    public function delete($id){
        try {
            $quarter = Quarter::find($id);
            if(is_null($quarter)){
                return response()->json(["message"=>"Quarter no existente"],404);
            }
            $quarter->delete();
            $response = [
                'message'=> 'Quarter eliminado satisfactoriamente',
                'quarter' => $quarter,
            ];
            return response()->json($response, 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Ha ocurrido un error al tratar de eliminar los datos.',
                'error' => $e->getMessage(),
                'linea' => $e->getLine()
            ], 500);
        }
    }
}
