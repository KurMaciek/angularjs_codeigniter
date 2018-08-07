<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Products extends CI_Controller {

	public function __construct(){
		parent::__construct();
		//Do your magic here
		$post = file_get_contents('php://input');
		$_POST = json_decode($post, true);
		$this->load->model( 'admin/Products_model' );
		
	}
	
	public function get($id = false)
	{
		
		$result = $this->Products_model->get($id);
		echo json_encode($result);
	}

	public function update(){

		$product = $this->input->post();
		
		$this->Products_model->update($product);
		
 	}

 	public function create(){
 		$product = $this->input->post();

 		$this->Products_model->create($product);
 	}
 	public function delete(){
 		$product = $this->input->post();
 		
 		$this->Products_model->delete($product);	
 	}
 	

}

/* End of file Products.php */
/* Location: ./application/controllers/admin/Products.php */