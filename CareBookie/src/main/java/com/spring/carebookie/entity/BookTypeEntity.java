package com.spring.carebookie.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.Column;

@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
@Entity
@Table(name ="loai")
public class BookTypeEntity {

	@Id
	@Column(name="maloai")
	private String id;
	
	@Column(name ="tenloai")
	private String name;

}
