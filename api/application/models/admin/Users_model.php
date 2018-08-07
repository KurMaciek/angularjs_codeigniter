<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users_model extends CI_Model {

	public function get($id = false){

		if($id == false){
			$result = $this->db->get('users');
			$result = $result->result();

		}else{
			$this->db->where('id', $id);
			$result = $this->db->get('users');
			$result = $result->row();
		}

		return($result);
	}

	public function create($data){

		$this->db->insert('users', $data);
	}

	public function update($data){

		$this->db->where('id', $data['id']);
		$this->db->update('users', $data);
	}

	public function delete($data){

		$this->db->where('id', $data['id']);
		$this->db->delete('users');

	}

	public function get_unique($id, $email){

		$this->db->where('email', $email);
		!$id || $this->db->where('id !=', $id);
		$q = $this->db->get('users');
		
		return $q->row();

	}
}

/* End of file Users_model.php */
/* Location: ./application/models/admin/Users_model.php */