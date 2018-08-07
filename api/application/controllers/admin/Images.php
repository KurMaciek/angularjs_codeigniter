<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Images extends CI_Controller {

	public function upload($id)
	{

		if ( !empty( $_FILES ) ) {
		    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];

		    $basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR;
		    $basePath = $basePath . $id . DIRECTORY_SEPARATOR;
		    if( !is_dir($basePath)){
				mkdir($basePath, 0700);
			}
			
		    $uploadPath = $basePath . $_FILES[ 'file' ][ 'name' ];
		    move_uploaded_file( $tempPath, $uploadPath );
		    $answer = array( 'answer' => 'File transfer completed' );
		    $json = json_encode( $answer );
		    echo $json;
		} else {
		    echo 'No files';
		}
	}

	public function getImages($id){
		$basePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR;
		$basePath = $basePath . $id . DIRECTORY_SEPARATOR;

		if( !is_dir($basePath)){
			return;
		}

		$files = scandir($basePath);
		$files = array_diff($files, array( '.', '..'));

		$new_files = array();
		foreach ($files as  $file) {
			$new_files[] = $file;
		}
		
		echo json_encode($new_files);

	}

	public function delete (){
		$post = file_get_contents('php://input');
		$_POST = json_decode($post, true);
		
		$id = $this->input->post( 'id' );
		$image = $this->input->post('image');

		$imagePath = FCPATH . '..' . DIRECTORY_SEPARATOR . 'files' . DIRECTORY_SEPARATOR;
		$imagePath = $imagePath . $id . DIRECTORY_SEPARATOR;
		$imagePath = $imagePath . $image;
		unlink($imagePath);
		
	}
}
