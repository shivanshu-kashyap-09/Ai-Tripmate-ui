package com.example.Travel.service;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


@Service
public class JsonConvertService {
	
	public ResponseEntity<?> jsonFormat(ResponseEntity<?> response){
		try {
			List<String> list = new ArrayList<>();
//          
          if (response.getBody() != null && !((JSONArray) response.getBody()).isEmpty()) {
              JSONArray jsonArray = new JSONArray(response.getBody().toString());
              
              for (int i = 0; i < jsonArray.length(); i++) {
                  JSONObject obj = jsonArray.getJSONObject(i);
                  if (obj.has("name")) {
                	  list.add(obj.getString("name"));
                  }
              }
          }

          // Print hotel names as JSON format in console
          JSONObject outputJson = new JSONObject();
          outputJson.put("names ", list);
          
//          System.out.println(outputJson.toString(4)); // Pretty print JSON

          return new ResponseEntity<>(outputJson.toString(), HttpStatus.OK);
		} catch (Exception e) {
			System.out.println("Error occured in json format "+e);
//			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
			return null;
		}
	}

}
