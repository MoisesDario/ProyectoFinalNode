$(function(){
    alert('Bienvenido al proyecto Final Node');
    $('#getProducts').on('click', function(){
        $.ajax({
            url: '/productos',
            success: function(productos){
                //console.log(productos);
                let tbody = $('tbody');

                tbody.html(''); //Limpiar la tabla
                productos.forEach(productos => {
                    tbody.append(`
                        <tr>
                            <td class="id"> ${productos.id}</td>
                            <td>
                                <input type="text" class="name" value="${productos.name}"/>
                            </td>
                            <td>
                                <button class="update-button">Editar</button>
                                <button class="delete-button">Eliminar</button>
                            </td>

                        </tr>
                    `)
                })
            }
        })
    });
    $('#productForm').on('submit',function(e){
    e.preventDefault();
        let newProduct = $('#newProduct');
        $.ajax({
            url: '/productos',
            method: 'POST',
            data: { 
                name: newProduct.val()
            },
            success: function (response){
                //console.log(response);
                $('#getProducts').click();
            }
        })
    });
    $('table').on('click', '.update-button',function(){
        let row = $(this).closest('tr');
        let id = row.find('.id').text();
        let name = row.find('.name').val();

        $.ajax({
            url: "/productos/" + id,
            method: 'PUT',
            data:{
                name: name
            },
            success: function(response){
               // console.log(response);
               $('#getProducts').click();
            }
        })
    });
    $('table').on('click', '.delete-button',function(){
        let row = $(this).closest('tr');
        let  id = row.find('.id').text();

        $.ajax({
            url: '/productos/' + id,
            method: 'DELETE',
            success: function (response){
                console.log(response);
                $('#getProducts').click();
            }
        })
    });
})