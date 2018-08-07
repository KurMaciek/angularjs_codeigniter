<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products_model extends CI_Model {

	public function get($id = false)
	{
		if($id == false){
			$q = $this->db->get('products');
			$q = $q->result();
		}else{
			$this->db->where('id', $id);
			$q = $this->db->get('products');
			$q = $q->row();
		}

		return $q;
	}

	public function update( $data = FALSE){
		
		$this->db->where( 'id', $data['id']);
		$this->db->update('products', $data);	
		
	}

	public function create( $data){
		
		$this->db->insert('products', $data);
	}

	public function delete($data){

		$this->db->where('id', $data['id']);
		$this->db->delete('products');
	}

}

/* End of file Products-model.php */
/* Location: ./application/models/admin/Products-model.php */