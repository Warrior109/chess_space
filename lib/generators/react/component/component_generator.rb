# frozen_string_literal: true

module React
  ROOT_PATH = 'app/javascript/bundles/'

  # Generates react component according to conventions
  class ComponentGenerator < Rails::Generators::NamedBase
    source_root File.expand_path('templates', __dir__)
    argument :component_type, type: :string,
      desc: 'can be l - "layouts", s - "screens" or c - "components"'

    def retrieve_namespaces
      @namespaces = file_path.split('/').map(&:camelize)
    end

    def retrieve_parent_folder_type
      parent_folder_type = case component_type
                           when 'l'
                             'layouts'
                           when 's'
                             'screens'
                           when 'c'
                             'components'
                           end
      @component_root_path = "#{ROOT_PATH}#{parent_folder_type}"
    end

    def retrieve_path_to_dir
      @path_to_dir = "#{@component_root_path}/#{@namespaces.join('/components/')}"
    end

    def create_component
      template 'component.template', "#{@path_to_dir}/#{file_name.camelize(:lower)}.js"
    end

    def create_component_index
      template 'index.template', "#{@path_to_dir}/index.js"
    end

    def write_to_components_folder_index
      return if @namespaces.length <= 1

      path_to_file = retrieve_path_to_index_file
      if File.exist?(path_to_file)
        import_from_components_folder(path_to_file)
        export_from_components_folder(path_to_file)
      else
        create_components_index_file(path_to_file)
      end
    end

    private

    def retrieve_path_to_index_file
      relative_path_to_file = @namespaces[0..-2].join('/components/')
      "#{@component_root_path}/#{relative_path_to_file}/components/index.js"
    end

    def import_from_components_folder(path_to_file)
      inject_into_file path_to_file,
        "import #{file_name.camelize} from './#{file_name.camelize}';\n",
        after: /^import .*;\n$/
    end

    def export_from_components_folder(path_to_file)
      gsub_file path_to_file,
        /^(export \{ [a-zA-Z, ]*) \};$/,
        '\1' + ", #{file_name.camelize} };"
    end

    def create_components_index_file(path_to_file)
      template 'components_index.template', path_to_file
    end
  end
end
