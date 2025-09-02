<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('quiz_id')->constrained('quizzes')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->json('answers');
            $table->float('score')->nullable();
            $table->timestamp('submitted_at')->nullable();
            $table->text('feedback')->nullable();
            $table->boolean('is_graded')->default(false);
            $table->foreignId('grader_id')->nullable()->constrained('users');
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('submissions');
    }
};
