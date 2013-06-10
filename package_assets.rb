require 'bundler/setup'
Bundler.require

Input = File.expand_path('assets')
Output = File.expand_path('public/assets')
FileUtils.rm_rf(Output)

env = Sprockets::Environment.new(Dir.pwd)
env.append_path(Input)
if ENV.fetch('COMPRESS', false)
  env.js_compressor = Uglifier.new
  env.css_compressor = YUI::CssCompressor.new(jar_file: File.expand_path('vendor/yuicompressor-2.4.7.jar'))
end
manifest = Sprockets::Manifest.new(env, Output)
manifest.compile([])
