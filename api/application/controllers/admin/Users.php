<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Users extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$post = file_get_contents('php://input');
		$_POST = json_decode($post, true);
		$this->load->model('admin/Users_model');

	}

	public function get($id = false)
	{
		$result = $this->Users_model->get($id);
		echo json_encode($result);
	}

	public function create(){
		
		$this->form_validation->set_error_delimiters('', '');
		$this->form_validation->set_rules('name', 'Imię', 'required');
		$this->form_validation->set_rules('email', 'email', 'required|valid_email|is_unique[users.email]');
		$this->form_validation->set_rules('password', 'Hasło', 'required|matches[passconf]');
		$this->form_validation->set_rules('passconf', 'Powtórz hasło', 'required|matches[password]');

		if( $this->form_validation->run()){
			
			$user = $this->input->post();
			unset($user['passconf']);
			unset($user['password']);
			$this->Users_model->create($user);
			
			

		}else{
			$output['error'] = true;
			$output['name'] = form_error( 'name' );
			$output['email'] = form_error('email');
			$output['password'] = form_error( 'password' );
			$output['passconf'] = form_error('passconf');
			echo json_encode($output);
		}

	}

	public function update(){

		$this->form_validation->set_error_delimiters('', '');
		$this->form_validation->set_rules('name', 'Imię', 'required');
		$this->form_validation->set_rules('email', 'email', 'required|valid_email|callback_unique_email');
		$this->form_validation->set_rules('password', 'Hasło', 'matches[passconf]');
		$this->form_validation->set_rules('passconf', 'Powtórz hasło', 'matches[password]');

		if($this->form_validation->run()){
			$user = $this->input->post();
			unset($user['password']);
			unset($user['passconf']);

			$this->Users_model->update($user);
			$output['error'] = false;
			echo json_encode($output);
		}else{
			$output['error'] = true;
			$output['name'] = form_error( 'name' );
			$output['email'] = form_error('email');
			$output['password'] = form_error( 'password' );
			$output['passconf'] = form_error('passconf');
			echo json_encode($output);
		}


	}

	public function delete(){

		$user = $this->input->post();
		$this->Users_model->delete($user);

	}

	function unique_email(){

		$id = $this->input->post('id');
		$email = $this->input->post('email');



		
		if($this->Users_model->get_unique($id, $email)){

			$this->form_validation->set_message('unique_email', 'Inny użytkownik posiada taki email');
			return false;	
		}
		
		return true;
	}

}

/* End of file Users.php */
/* Location: ./application/controllers/admin/Users.php */